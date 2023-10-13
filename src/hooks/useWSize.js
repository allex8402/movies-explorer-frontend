import { useState, useEffect } from 'react';

export const useWSize = () => {
    const isWindowClient = typeof window === 'object';
    const [windowSize, setWindowSize] = useState(
        isWindowClient ? window.innerWidth : undefined
    );

    useEffect(() => {
        function handleResize() { // обработчик, который будет вызываться при изменении размера экрана
            setWindowSize(window.innerWidth);
        }
        if (isWindowClient) {
            window.addEventListener('resize', handleResize); // вешаем слушатель изменения размера окна
            return () => window.removeEventListener('resize', handleResize);
        }
    }, [isWindowClient, setWindowSize]);
    return windowSize;
}