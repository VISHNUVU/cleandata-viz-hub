# CleanData Viz Hub

A modern web application for data cleansing and visualization, built with React, TypeScript, and Tailwind CSS.

## Features

- 📊 Data Analysis: Analyze your data with detailed column statistics and quality metrics
- 🧹 Data Cleansing: Identify and fix data quality issues automatically
- 📈 Visualization: Create beautiful visualizations of your cleaned data
- 🌓 Dark Mode: Built-in dark mode support
- 📱 Responsive Design: Works on all screen sizes
- 🔒 Type Safety: Built with TypeScript for better development experience

## Tech Stack

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Supabase](https://supabase.com/)
- [React Router](https://reactrouter.com/)
- [Lucide Icons](https://lucide.dev/)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/cleandata-viz-hub.git
   cd cleandata-viz-hub
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the root directory and add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production

To create a production build:

```bash
npm run build
# or
yarn build
```

The build artifacts will be stored in the `dist/` directory.

## Project Structure

```
src/
├── components/         # Reusable components
│   ├── ui/            # UI components from shadcn/ui
│   └── ...
├── contexts/          # React contexts
├── hooks/             # Custom hooks
├── lib/              # Utility functions
├── pages/            # Page components
├── services/         # API and service functions
└── App.tsx           # Root component
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
