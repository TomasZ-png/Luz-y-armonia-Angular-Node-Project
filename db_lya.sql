-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "apellido" VARCHAR(100) NOT NULL,
    "correo" TEXT NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "rol" VARCHAR(50) NOT NULL DEFAULT 'USER',
    "verificado" BOOLEAN DEFAULT false,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Producto" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "idAroma" INTEGER NOT NULL,
    "precio" DOUBLE PRECISION NOT NULL,
    "stock" INTEGER NOT NULL,
    "idTamanio" INTEGER,
    "mililitros" DOUBLE PRECISION,
    "premium" BOOLEAN DEFAULT false,

    CONSTRAINT "Producto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Aroma" (
    "id" SERIAL NOT NULL,
    "aroma" TEXT NOT NULL,

    CONSTRAINT "Aroma_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_correo_key" ON "Usuario"("correo");

-- CreateIndex
CREATE UNIQUE INDEX "Aroma_aroma_key" ON "Aroma"("aroma");

-- AddForeignKey
ALTER TABLE "Producto" ADD CONSTRAINT "fk_producto_aroma" FOREIGN KEY ("idAroma") REFERENCES "Aroma"("id") ON DELETE RESTRICT ON UPDATE CASCADE;


INSERT INTO "Aroma" (aroma) VALUES ('Vainilla');
-- 12345678
INSERT INTO "Usuario" (nombre, apellido, correo, password, rol, verificado) VALUES ('Admin', '-', 'admin@test.com', '$2b$10$fHaFdK2Fe5fVGddRs1FYAuPoM/.4MGErky/oRPCelbFmKWl8s4/0G', 'ADMIN', true);