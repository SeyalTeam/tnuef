// Quick test to verify Vercel Blob token is loaded
// Run this with: node test-blob-token.js

console.log('🔍 Checking Vercel Blob Configuration...\n')

// Load environment variables
import dotenv from 'dotenv'
dotenv.config()

const token = process.env.BLOB_READ_WRITE_TOKEN

if (token) {
  console.log('✅ BLOB_READ_WRITE_TOKEN is set')
  console.log(`   Token starts with: ${token.substring(0, 20)}...`)
  console.log(`   Token length: ${token.length} characters`)
} else {
  console.log('❌ BLOB_READ_WRITE_TOKEN is NOT set')
  console.log('   Please add it to your .env file')
}

console.log('\n📋 .env file location: .env (in project root)')
console.log('   Make sure the line looks like:')
console.log(
  '   BLOB_READ_WRITE_TOKEN=vercel_blob_rw_ploAiCQOtYE9omI2_NAFK9n8n5jS9juYLSCy8eD84gtIVsL',
)
console.log('   (NO quotes around the value)')
