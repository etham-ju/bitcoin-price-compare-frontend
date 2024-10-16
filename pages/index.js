import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [prices, setPrices] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState({
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString(),
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://bitcoin-price-compare-backend.onrender.com/api/prices');
        const data = await response.json();
        setPrices(data.prices);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!prices) return <p>Error loading data.</p>;

  return (
      <div className={styles.container}>
        <h1 className={styles.title}>Bitcoin Prices</h1>
        <div className={styles.time}><span>{currentTime.date}</span> <span>{currentTime.time}</span></div>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <strong className={styles.strongText}>Binance:</strong>
            <p className={styles.paragraph}>
              USD: {Number(prices.binance.usd).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}
            </p>
          </li>
          <li className={styles.listItem}>
            <strong className={styles.strongText}>Coinbase:</strong>
            <p className={styles.paragraph}>
              USD: {Number(prices.coinbase.usd).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}
            </p>
            <p className={styles.paragraph}>
              Premium on Binance: {Number(prices.coinbase.difference).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}%
            </p>
          </li>
          <li className={styles.listItem}>
            <strong className={styles.strongText}>Upbit:</strong>
            <p className={styles.paragraph}>
              KRW: {Number(prices.upbit.krw).toLocaleString(undefined, {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0
            })}
            </p>
            <p className={styles.paragraph}>
              USD: {Number(prices.upbit.usd).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}
            </p>
            <p className={styles.paragraph}>
              Premium on Binance: {Number(prices.upbit.difference).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}%
            </p>
          </li>
          <li className={styles.listItem}>
            <strong className={styles.strongText}>Bithumb:</strong>
            <p className={styles.paragraph}>
              KRW: {Number(prices.bithumb.krw).toLocaleString(undefined, {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0
            })}
            </p>
            <p className={styles.paragraph}>
              USD: {Number(prices.bithumb.usd).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}
            </p>
            <p className={styles.paragraph}>
              Premium on Binance: {Number(prices.bithumb.difference).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}%
            </p>
          </li>

        </ul>
      </div>
  );
}
