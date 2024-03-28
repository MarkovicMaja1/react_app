Welcome to the React full stack application for maintenance of pharmacy products. To start this application, you can clone this git repository in VSCode with command: git clone https://github.com/MarkovicMaja1/task_react.git . You need to start the api with command: npm start. You need to start frontend with command: npm run dev. The app would be available at http://localhost:5173. I used freesqldatabase for the database, which is defined in the config file.

The frontend is built using React, with additional libraries like React Router DOM for routing, Axios for HTTP requests, React Hook Form for form management, and Chart.js for data visualization. TypeScript is used for static typing and Vite for fast development builds. The backend is built using Node.js and Express.js framework.

(npm install @vitejs/plugin-react --save-dev - frontend) (npm install cookie-parser -api)










# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
