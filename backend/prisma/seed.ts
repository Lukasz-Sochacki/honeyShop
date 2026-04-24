import { PrismaClient } from '@prisma/client';
const db = new PrismaClient();

function getProducts() {
  return [
    {
      id: 'p1-honey-lipowy',
      name: 'Linden honey',
      price: 4500,
      shortDescription: 'Light honey with a strong aroma of linden flowers.',
      description:
        'Our linden honey comes from organic apiaries. It has diaphoretic and antipyretic properties',
      mainImage: '/images/Linden-honey.jpg',
    },
    {
      id: 'p2-honey-gryczany',
      name: 'Buckwheat honey',
      price: 5200,
      shortDescription: 'Dark honey with a distinct, spicy flavor.',
      description:
        'Perfect for baking, especially gingerbread. It has a high rutin content.',
      mainImage: '/images/Buckwheat-honey.jpg',
    },
    {
      id: 'p3-drink-dwojniak',
      name: 'Mead',
      price: 8900,
      shortDescription: 'A noble drink matured for 2 years.',
      description: 'Traditional Polish mead. The water-to-honey ratio is 1:1.',
      mainImage: '/images/Mead.jpg',
    },
  ];
}

function getAdditionalImages() {
  return [
    {
      id: 'img1',
      url: '/images/Linden-honey-detal1.jpg',
      productId: 'p1-honey-lipowy',
    },
    {
      id: 'img2',
      url: '/images/Linden-honey-detal2.jpg',
      productId: 'p1-honey-lipowy',
    },
    {
      id: 'img3',
      url: '/images/Buckwheat-honey-detal1.jpg',
      productId: 'p2-honey-gryczany',
    },
    {
      id: 'img4',
      url: '/images/Mead-detal1.jpg',
      productId: 'p3-drink-dwojniak',
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
  console.log('Seed zakończony pomyślnie z lokalnymi ścieżkami do zdjęć');
}

seed();
