module.exports = {
    parser: '@typescript-eslint/parser', // Define o parser para TypeScript
    parserOptions: {
      ecmaVersion: 2020, // Configura a versão do ECMAScript
      sourceType: 'module', // Habilita o suporte para módulos ES6
      ecmaFeatures: {
        jsx: true, // Habilita o suporte para JSX
      },
    },
    extends: [
      'eslint:recommended', // Conjunto de regras recomendadas pelo ESLint
      'plugin:@typescript-eslint/recommended', // Regras recomendadas para TypeScript
      'plugin:react/recommended', // Regras recomendadas para React
      'plugin:prettier/recommended', // Configuração para integrar ESLint com Prettier
    ],
    plugins: ['@typescript-eslint', 'prettier', 'react'], // Plugins que você está usando
    settings: {
      react: {
        version: 'detect', // Detecta automaticamente a versão do React
      },
      'import/resolver': {
        node: {
          paths: ['src'], // Configura o caminho para módulos
          extensions: ['.js', '.jsx', '.ts', '.tsx'], // Extensões de arquivos reconhecidas
        },
      },
    },
    rules: {
      'prettier/prettier': 'error', // Garante que o código siga as regras do Prettier
      '@typescript-eslint/explicit-module-boundary-types': 'off', // Desativa a exigência de tipos explícitos em funções de módulo
      'react/react-in-jsx-scope': 'off', // Desativa a regra que exige importação do React em arquivos JSX (React 17+ não precisa mais disso)
      'react/prop-types' : 'off', 
      'no-console': 'warn', // Aviso para o uso de console.log
      'eqeqeq': 'error', // Exige o uso de === e !==
      'import/no-unresolved': 'error', // Garante que módulos importados sejam resolvidos
    },
  };
  