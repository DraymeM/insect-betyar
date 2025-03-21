# React + TypeScript + Vite + TanStack + Bootstrap
<table>
  <tr>
    <td align="center">
      <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="React Logo" width="100" height="100" />
    </td>
    <td align="center">
      <img src="https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg" alt="TypeScript Logo" width="100" height="100" />
    </td>
    <td align="center">
      <img src="https://vitejs.dev/logo.svg" alt="Vite Logo" width="100" height="100" />
    </td>
    <td align="center">
      <img src="https://tanstack.com/_build/assets/logo-color-600w-Er4SOkq1.png" alt="TanStack Logo" width="100" height="100" />
    </td>
    <td align="center">
      <img src="https://getbootstrap.com/docs/5.3/assets/brand/bootstrap-logo-shadow.png" alt="Bootstrap Logo" width="100" height="100" />
    </td>
  </tr>
</table>

This template provides a minimal setup to get React working in Vite with HMR (Hot Module Replacement), TypeScript for type safety, TanStack (React Query) for data fetching, TanStack Router for advanced routing, and Bootstrap for styling. It also includes ESLint for code linting and formatting.

## Features

    React: A JavaScript library for building user interfaces.

    TypeScript: A typed superset of JavaScript for better developer experience.

    Vite: A fast build tool and development server.

    TanStack (React Query): A powerful data-fetching library for React.

    Bootstrap: A popular CSS framework for responsive and mobile-first designs.

    ESLint: For code linting and maintaining code quality.

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```

## TanStack (React Query) Example
```js
import React from 'react';
import { useQuery } from '@tanstack/react-query';

const fetchUsers = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  return response.json();
};

const UsersList: React.FC = () => {
  const { data, isLoading, error } = useQuery(['users'], fetchUsers);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;

  return (
    <ul>
      {data?.map((user: any) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
};

export default UsersList;
```

## Bootstrap Integration
```js
import React from 'react';

const AlertButton: React.FC = () => {
  return (
    <button className="btn btn-primary">
      Click Me!
    </button>
  );
};

export default AlertButton;
```
