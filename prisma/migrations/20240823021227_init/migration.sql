-- CreateTable
CREATE TABLE "todo" (
    "id" SERIAL NOT NULL,
    "text" VARCHAR NOT NULL,
    "caompleteAt" TIMESTAMP NOT NULL,

    CONSTRAINT "todo_pkey" PRIMARY KEY ("id")
);
