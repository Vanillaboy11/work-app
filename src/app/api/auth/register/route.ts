import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { email, password, fullName, age, phone, location, bio } = await req.json();

    // Validate required fields
    if (!email || !password || !fullName) {
      return NextResponse.json(
        { error: "Todos los campos obligatorios son requeridos" },
        { status: 400 }
      );
    }

    // Validate age if provided
    if (age !== undefined && age !== null) {
      const ageNum = parseInt(age);
      if (isNaN(ageNum) || ageNum < 18 || ageNum > 100) {
        return NextResponse.json(
          { error: "La edad debe estar entre 18 y 100 años" },
          { status: 400 }
        );
      }
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "El usuario ya existe" },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await hash(password, 10);

    // Create the user
    const user = await prisma.user.create({
      data: {
        email,
        name: fullName,
        password: hashedPassword,
        role: "USER",
        age: age ? parseInt(age) : undefined,
        phone: phone || undefined,
        location: location || undefined,
        bio: bio || undefined,
      },
    });

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json(
      {
        user: userWithoutPassword,
        message: "Usuario creado exitosamente",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Error al crear el usuario" },
      { status: 500 }
    );
  }
}