-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "apellido" VARCHAR(100) NOT NULL,
    "correo" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "rol" VARCHAR(50) NOT NULL DEFAULT 'USER',
    "verificado" BOOLEAN DEFAULT false,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Tipo_de_productos" (
    "id" SERIAL PRIMARY KEY,
    "tipo" VARCHAR(100) NOT NULL
);

INSERT INTO "Tipo_de_productos" (tipo) VALUES ('VELA'), ('DIFUSOR'), ('BODY SPLASH');

CREATE TABLE "Aroma" (
    "id" SERIAL NOT NULL,
    "aroma" TEXT NOT NULL,

    CONSTRAINT "Aroma_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Producto" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "idAroma" INTEGER NOT NULL,
    "precio" DOUBLE PRECISION NOT NULL,
    "stock" INTEGER NOT NULL,
    "alto" DOUBLE PRECISION,
    "ancho" DOUBLE PRECISION,
    "mililitros" DOUBLE PRECISION,
    "premium" BOOLEAN DEFAULT false,
    "idTipoProducto" INTEGER NOT NULL,
    CONSTRAINT "Producto_pkey" PRIMARY KEY ("id"),
    CONSTRAINT fk_tipo_producto
    FOREIGN KEY ("idTipoProducto") REFERENCES "Tipo_de_productos"("id")
);

CREATE TABLE "ImagenProducto"(
    "id" SERIAL PRIMARY KEY,
    "url" VARCHAR(255) NOT NULL,
    "idProducto" INTEGER NOT NULL,
    CONSTRAINT "fk_producto"
        FOREIGN KEY ("idProducto")
        REFERENCES "Producto"("id")
        ON DELETE CASCADE
);

CREATE TABLE "Mi_Carrito" (
    "id" SERIAL NOT NULL,
    "idUsuario" INTEGER NOT NULL,
    CONSTRAINT "mi_carrito_pkey" PRIMARY KEY ("id"),
    CONSTRAINT fk_mi_carrito_usuario
    FOREIGN KEY ("idUsuario") REFERENCES "Usuario"("id"),
    CONSTRAINT uq_mi_carrito_usuario UNIQUE ("idUsuario")
);

CREATE TABLE "Mi_Carrito_Producto"(
    "id" SERIAL PRIMARY KEY,
    "idCarrito" INTEGER NOT NULL,
    "idProducto" INTEGER NOT NULL,
    "cantidad" INTEGER NOT NULL DEFAULT 1, 
    FOREIGN KEY ("idCarrito") REFERENCES "Mi_Carrito"("id") ON DELETE CASCADE,
    FOREIGN KEY ("idProducto") REFERENCES "Producto"("id")
);

CREATE TABLE "favorito"(
    "id" SERIAL PRIMARY KEY,
    "idUsuario" INTEGER NOT NULL,
    "idProducto" INTEGER NOT NULL,
    FOREIGN KEY ("idUsuario") REFERENCES "Usuario"("id"),
    FOREIGN KEY ("idProducto") REFERENCES "Producto"("id") ON DELETE CASCADE
);


CREATE TABLE "Compra"(
    "id" SERIAL PRIMARY KEY,
    "idUsuario" INTEGER NOT NULL,
    "estado" VARCHAR(30) NOT NULL DEFAULT 'CREADA',
    "paymentId" VARCHAR(100),
    "total" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "fecha" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("idUsuario") REFERENCES "Usuario"("id")
);

CREATE TABLE "Producto_Compra" (
    "id" SERIAL PRIMARY KEY,
    "idProducto" INTEGER NOT NULL,
    "cantidad" INTEGER NOT NULL DEFAULT 1,
    "idCompra" INTEGER NOT NULL,
    FOREIGN KEY ("idProducto") REFERENCES "Producto"("id"),
    FOREIGN KEY ("idCompra") REFERENCES "Compra"("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_correo_key" ON "Usuario"("correo");

-- CreateIndex
CREATE UNIQUE INDEX "Aroma_aroma_key" ON "Aroma"("aroma");

ALTER TABLE "Mi_Carrito_Producto"
ADD CONSTRAINT mi_carrito_producto_unique
UNIQUE ("idCarrito", "idProducto");

-- AddForeignKey
ALTER TABLE "Producto" ADD CONSTRAINT "fk_producto_aroma" FOREIGN KEY ("idAroma") REFERENCES "Aroma"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

INSERT INTO "Aroma" (aroma) VALUES ('Vainilla');
-- 12345678
INSERT INTO "Usuario" (nombre, apellido, correo, password, rol, verificado) VALUES ('Admin', '-', 'admin@test.com', '$2b$10$fHaFdK2Fe5fVGddRs1FYAuPoM/.4MGErky/oRPCelbFmKWl8s4/0G', 'ADMIN', true);