# Instrucciones para Aplicar la Migración de Base de Datos

## Problema Actual
No se puede conectar a la base de datos de Supabase desde la línea de comandos.

## Soluciones

### Opción 1: Ejecutar SQL Manualmente en Supabase (RECOMENDADO)

1. **Ir a Supabase Dashboard**
   - Abre tu navegador
   - Ve a https://supabase.com/dashboard
   - Inicia sesión en tu cuenta

2. **Seleccionar tu Proyecto**
   - Busca el proyecto: `db.vdtysibzyvguhrbaefst`
   - Si el proyecto está pausado, haz clic en "Resume" o "Restore"

3. **Abrir SQL Editor**
   - En el menú lateral, haz clic en "SQL Editor"
   - Haz clic en "New Query"

4. **Ejecutar la Migración**
   - Copia todo el contenido del archivo: `prisma/manual_migration.sql`
   - Pégalo en el editor SQL
   - Haz clic en "Run" o presiona Ctrl+Enter

5. **Verificar los Resultados**
   - Deberías ver una tabla con todas las columnas del modelo Job
   - Verifica que las nuevas columnas aparezcan

6. **Actualizar Prisma Client**
   ```powershell
   cd "c:\students app\work-app"
   npx prisma generate
   ```

### Opción 2: Reactivar el Proyecto de Supabase

Si el proyecto está pausado:

1. Ve a https://supabase.com/dashboard
2. Busca tu proyecto
3. Haz clic en "Settings" → "General"
4. Si ves un botón "Resume project" o "Restore project", haz clic en él
5. Espera unos minutos a que el proyecto se reactive
6. Intenta nuevamente:
   ```powershell
   cd "c:\students app\work-app"
   npx prisma db push
   ```

### Opción 3: Verificar las Credenciales de la Base de Datos

1. Ve a Supabase Dashboard → Settings → Database
2. Verifica la cadena de conexión
3. Actualiza el archivo `.env.local` con las credenciales correctas
4. Las credenciales deberían verse así:
   ```
   DATABASE_URL="postgresql://postgres.[PASSWORD]@db.[PROJECT-REF].supabase.co:6543/postgres?pgbouncer=true"
   DIRECT_URL="postgresql://postgres.[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"
   ```

## Después de Aplicar la Migración

Una vez que la migración se aplique exitosamente, puedes:

1. **Actualizar el seed script** (opcional) para incluir datos de ejemplo con los nuevos campos
2. **Verificar la aplicación** - La página de detalles del trabajo mostrará todos los campos nuevos
3. **Crear/editar trabajos** con la información completa

## Campos Nuevos Agregados

- `salaryMax`: Salario máximo (opcional)
- `workMode`: Modalidad de trabajo (Remoto, Presencial, Híbrido)
- `contractType`: Tipo de contrato (Tiempo Completo, Medio Tiempo, etc.)
- `schedule`: Horario de trabajo (opcional)
- `requirements`: Requisitos del puesto (opcional)
- `benefits`: Beneficios ofrecidos (opcional)
- `experienceLevel`: Nivel de experiencia requerido (opcional)
- `department`: Departamento (opcional)
- `applicationDeadline`: Fecha límite de aplicación (opcional)
- `isActive`: Estado activo/inactivo del trabajo

## Notas

- La aplicación ya está preparada para funcionar con estos campos
- Los campos opcionales se mostrarán solo cuando tengan valores
- La página de detalles del trabajo (`/jobs/[id]`) ya está completamente implementada
