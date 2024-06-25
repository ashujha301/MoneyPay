# Going to Make It

## Steps to Follow

### Step 1: Clone the Repository

```bash
git clone <repository-url>
```

### Step 2: Install Dependencies

Navigate to the project directory and install the necessary packages:

```bash
npm install
```

### Step 3: Navigate to the Database Package

Change directory to the `packages/db` folder:

```bash
cd packages/db
```

### Step 4: Add Environment Variables\n\nCreate a `.env` file and add your database URL

```env
DATABASE_URL=your-database-url
```

### Step 5: Run Prisma Migrations

Apply the database migrations:

```bash
npx prisma migrate dev
```

### Step 6: Generate Prisma Client

Generate the Prisma client:

```bash
npx prisma generate
```

### Step 7: Add Environment Variables to User App

Navigate to the `app/user-app` directory and create a `.env` file with the necessary environment variables.

### Step 8: Start the Development Server\n\nRun the development server

```bash
npm run dev
```

## Architecture in mind:

![Screenshot 2024-06-25 203339](https://github.com/rahul-MyGit/MoneyPay/assets/153066667/09883b4f-56a4-4fef-be79-a636f06eeffd)

