# Vercel Deployment Checklist for Blob Storage

## ⚠️ CRITICAL: Environment Variables

Before deploying, you MUST add the following environment variable to your Vercel project:

### Step 1: Add Environment Variable in Vercel Dashboard

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variable:

```
Name: BLOB_READ_WRITE_TOKEN
Value: vercel_blob_rw_ploAiCQOtYE9omI2_NAFK9n8n5jS9juYLSCy8eD84gtIVsL
Environment: Production, Preview, Development (select all)
```

4. Click **Save**

### Step 2: Redeploy

After adding the environment variable, you MUST redeploy:

```bash
git push origin main
```

Or trigger a redeploy from the Vercel dashboard.

### Step 3: Verify

1. Check the deployment logs for any errors
2. Try uploading an image in the admin panel
3. Verify the image URL starts with a Vercel Blob URL

## 🔧 Configuration Summary

Your project is configured to use Vercel Blob Storage with:

- **Plugin:** `@payloadcms/storage-vercel-blob@3.64.0`
- **Collection:** `media`
- **Local Storage:** Disabled
- **Token Environment Variable:** `BLOB_READ_WRITE_TOKEN`

## ⚡ Important Notes

1. **All media uploads** will go to Vercel Blob Storage
2. **No local filesystem** operations will occur
3. **Environment variable** must be set in Vercel dashboard
4. **Token must match** your Vercel Blob storage instance

## 🐛 Troubleshooting

If you still see the `ENOENT mkdir 'media'` error:

1. ✅ Verify the token is set in Vercel dashboard
2. ✅ Ensure you redeployed after adding the token
3. ✅ Check that the token value has NO quotes
4. ✅ Confirm all `@payloadcms/*` packages are version `3.64.0`
5. ✅ Clear Vercel build cache and redeploy

## 🔄 Current Deployment Status

After pushing these latest changes:

- ✅ `disableLocalStorage` is properly configured in the plugin
- ✅ Media collection is set up for cloud storage
- ✅ `.gitignore` updated to exclude local media files
- ⏳ **NEXT STEP:** Add `BLOB_READ_WRITE_TOKEN` to Vercel dashboard and redeploy
