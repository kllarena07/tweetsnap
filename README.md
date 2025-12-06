# TweetSnap

## ✍ About
A Chrome extension to capture and copy tweet screenshots to clipboard.
![Helium](https://github.com/user-attachments/assets/aa229caf-a109-4b3f-9c9e-35e5cb2ef593)

## 📦 Installation

### From Source

1. Clone this repository
2. Navigate to the `tweet-screenshot-extension` directory
3. Install dependencies:
   ```bash
   npm install
   # or
   pnpm install
   ```
4. Build the extension:
   ```bash
   npm run build
   # or
   pnpm build
   ```

### Load in Chrome

1. Open Chrome and go to `chrome://extensions/`
2. Enable "Developer mode" (toggle in top right)
3. Click "Load unpacked"
4. Select the `dist` folder from the extension directory
5. The extension icon should appear in your toolbar

## 🔗 Dependencies

- [react-tweet](https://github.com/vercel/react-tweet) - Tweet embedding
- [modern-screenshot](https://github.com/qq15725/modern-screenshot) - Screenshot capture

## 🔧 Configuration

The extension uses the following configuration:

- **Manifest V3**: Latest Chrome extension manifest format
- **Popup Dimensions**: 350x500px optimized for tweet content
- **Permissions**:
  - `activeTab`: Access current tab
  - `clipboardWrite`: Write to clipboard
  - `scripting`: Required for clipboard operations

## 🐛 Troubleshooting

### Clipboard Issues

If clipboard access fails:

1. **Check Permissions**: Ensure the extension has clipboard permissions
2. **Browser Settings**: Some browsers restrict clipboard access in certain contexts
3. **Fallback**: The extension will automatically download the screenshot as a file if clipboard access is denied

### Build Issues

1. **Clear Cache**: Delete `node_modules` and reinstall dependencies
2. **Node Version**: Ensure you're using Node.js 16 or higher
3. **Permissions**: Check that the extension has proper file system permissions

### Extension Not Loading

1. **Manifest Validation**: Ensure `manifest.json` is valid JSON
2. **File Paths**: Verify all files are in the correct locations
3. **Chrome Version**: Ensure you're using a recent Chrome version

_Made with ❤️ by [krayondev](https://x.com/krayondev)_
