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

function getVariants() {
  return [
    // Linden honey
    { id: 'v1', name: '250g', price: 2500, productId: 'p1-honey-lipowy' },
    { id: 'v2', name: '500g', price: 4500, productId: 'p1-honey-lipowy' },
    { id: 'v3', name: '1kg', price: 8000, productId: 'p1-honey-lipowy' },
    // Buckwheat honey
    { id: 'v4', name: '500g', price: 5200, productId: 'p2-honey-gryczany' },
    { id: 'v5', name: '1kg', price: 9500, productId: 'p2-honey-gryczany' },
    // Mead
    { id: 'v6', name: '250ml', price: 3900, productId: 'p3-drink-dwojniak' },
    { id: 'v7', name: '500ml', price: 6500, productId: 'p3-drink-dwojniak' },
    { id: 'v8', name: '750ml', price: 8900, productId: 'p3-drink-dwojniak' },
  ];
}

async function seed() {
  await db.productVariant.deleteMany();
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

  await Promise.all(
    getVariants().map(({ productId, ...variantData }) => {
      return db.productVariant.create({
        data: {
          ...variantData,
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
