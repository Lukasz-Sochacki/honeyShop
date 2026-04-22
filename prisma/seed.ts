import { PrismaClient } from '@prisma/client';
const db = new PrismaClient();

function getProducts() {
  return [
    {
      id: 'p1-honey-lipowy',
      name: 'Miód Lipowy',
      price: 4500,
      shortDescription: 'Jasny miód o silnym aromacie kwiatów lipy.',
      description:
        'Nasz miód lipowy pochodzi z ekologicznych pasiek. Ma działanie napotne i przeciwgorączkowe.',
      mainImage: 'https://unsplash.com',
    },
    {
      id: 'p2-honey-gryczany',
      name: 'Miód Gryczany',
      price: 5200,
      shortDescription: 'Ciemny miód o wyrazistym, korzennym smaku.',
      description:
        'Idealny do wypieków, szczególnie do piernika. Charakteryzuje się wysoką zawartością rutyny.',
      mainImage: 'https://unsplash.com',
    },
    {
      id: 'p3-drink-dwojniak',
      name: 'Miód Pitny Dwójniak',
      price: 8900,
      shortDescription: 'Szlachetny trunek dojrzewający 2 lata.',
      description:
        'Tradycyjny polski miód pitny. Proporcja wody do miodu wynosi 1:1.',
      mainImage: 'https://unsplash.com',
    },
  ];
}

function getAdditionalImages() {
  return [
    {
      id: 'img1',
      url: 'https://unsplash.com',
      productId: 'p1-honey-lipowy',
    },
    {
      id: 'img2',
      url: 'https://unsplash.com',
      productId: 'p1-honey-lipowy',
    },
  ];
}

async function seed() {
  await db.image.deleteMany();
  await db.orderProduct.deleteMany();
  await db.product.deleteMany();

  await Promise.all(
    getProducts().map((product) => {
      return db.product.create({ data: product });
    }),
  );

  await Promise.all(
    getAdditionalImages().map(({ productId, ...imageData }) => {
      return db.image.create({
        data: {
          ...imageData,
          product: {
            connect: { id: productId },
          },
        },
      });
    }),
  );
  console.log('Seed zakończony pomyślnie');
}

seed();
