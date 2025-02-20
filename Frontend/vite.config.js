import { defineConfig } from 'vite';

export default defineConfig({
    build:{
        rollupOptions: {
            input: {
                index: 'index.html',
                register: 'register.html',
                login: 'login.html',
                profile: 'profile-page.html',
                todo: 'todo-page.html',
            },
        },
    },
    server: {
        proxy: {
            '/api': 'http://localhost:8000',
        },
    },
});