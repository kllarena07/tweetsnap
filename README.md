# Tweet Screenshot Extension

A Chrome extension to capture and copy tweet screenshots to clipboard.

## 🚀 Features

- 📸 **Screenshot Capture**: Capture tweet screenshots with high quality
- 📋 **Clipboard Copy**: Copy screenshots directly to clipboard
- 🌙 **Dark Mode**: Beautiful dark theme for tweets
- 🔗 **URL Input**: Support for Twitter/X URLs and direct tweet IDs
- ⚡ **Fast**: Lightweight and responsive popup interface

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

## 🎯 Usage

1. **Open Extension**: Click the extension icon in your Chrome toolbar
2. **Enter Tweet URL**:
   - Paste a Twitter/X URL (e.g., `https://twitter.com/user/status/123456789`)
   - Or enter a direct tweet ID (e.g., `1234567890123456789`)
   - Click the paste button (📋) to paste from clipboard
3. **Capture Tweet**: Click "📸 Copy Screenshot" button
4. **Get Screenshot**: The tweet screenshot will be copied to your clipboard

## 🛠️ Development

### Prerequisites

- Node.js 16+
- npm or pnpm

### Development Setup

1. Clone the repository
2. Navigate to the extension directory
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start development server:
   ```bash
   npm run dev
   ```
5. Load the extension in Chrome using the `dist` folder

### Building

```bash
npm run build
```

The built extension will be in the `dist` folder, ready to be loaded in Chrome.

## 🔧 Configuration

The extension uses the following configuration:

- **Manifest V3**: Latest Chrome extension manifest format
- **Popup Dimensions**: 350x500px optimized for tweet content
- **Permissions**:
  - `activeTab`: Access current tab
  - `clipboardWrite`: Write to clipboard
  - `scripting`: Required for clipboard operations

## 📋 Supported URL Formats

- `https://twitter.com/user/status/123456789`
- `https://x.com/user/status/123456789`
- `https://twitter.com/user/statuses/123456789`
- `https://x.com/user/statuses/123456789`
- Direct tweet ID: `1234567890123456789`

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

## 📄 File Structure

```
tweet-screenshot-extension/
├── manifest.json          # Chrome extension manifest
├── index.html            # Extension popup HTML
├── vite.config.ts        # Vite configuration
├── tsconfig.json          # TypeScript configuration
├── tsconfig.node.json     # Node TypeScript configuration
├── package.json           # Dependencies and scripts
├── README.md              # This file
├── public/               # Static assets
│   └── icons/          # Extension icons
└── src/                  # Source code
    ├── components/        # React components
    ├── PopupApp.tsx      # Main popup component
    ├── main.tsx          # React entry point
    └── popup.css          # Extension styles
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details.

## 🔗 Dependencies

- [React](https://reactjs.org/) - UI framework
- [react-tweet](https://github.com/vercel/react-tweet) - Tweet embedding
- [modern-screenshot](https://github.com/qq15725/modern-screenshot) - Screenshot capture
- [SWR](https://swr.vercel.app/) - Data fetching
- [Vite](https://vitejs.dev/) - Build tool

## 📞 Support

For issues and feature requests, please open an issue on the GitHub repository.
