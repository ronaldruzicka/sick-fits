import { products } from './data'

export async function insertSeedData(ks: any) {
  // Keystone API changed, so we need to check for both versions to get keystone
  const keystone = ks.keystone || ks
  const adapter = keystone.adapters?.MongooseAdapter || keystone.adapter

  console.log(`🌱 Inserting Seed Data: ${products.length} Products`)

  const { mongoose } = adapter

  // eslint-disable-next-line
  for (const product of products) {
    console.log(`🛍️ Adding Product: ${product.name}`)

    // eslint-disable-next-line
    const { _id: id } = await mongoose
      .model('ProductImage')
      .create({ image: product.photo, altText: product.description })

    product.photo = id
    // eslint-disable-next-line
    await mongoose.model('Product').create(product)
  }

  console.log(`✅ Seed Data Inserted: ${products.length} Products`)
  console.log(`👋 Please start the process with \`yarn dev\` or \`npm run dev\``)
  process.exit()
}
