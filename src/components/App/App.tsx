import React, {useEffect, useState} from 'react';
import styles from './App.module.scss'
import {Layout} from "antd";
import {MySelect} from "../MySelect/MySelect";
import axios from "axios";
import {TRates} from "../../types/valute";
import {BASE_URL} from "../../api/api";
import rucurrency from '../../json/currency.json'
import locale from '../../json/valute-locale.json'
let userLang = navigator.language || 'en';

function App() {

  const [baseCurrency, setBaseCurrency] = useState<string | null>(userLang in locale
      ? locale[userLang as keyof typeof locale]
      : "USD");
  const [targetCurrency, setTargetCurrency] = useState<string | null>(null);

  const [basePrice, setBasePrice] = useState<number>(0);
  const [targetPrice, setTargetPrice] = useState<number>(0);

  const [rates, setRates] = useState<TRates>({})


  useEffect(  () => {

    const getData = async () => {
      await axios.get(BASE_URL)
          .then((res) => {
            let valutes = Object.keys(rucurrency)
            let data = res.data.rates
            Object.keys(data).forEach(valute => {
              if (!valutes.includes(valute)) {
                delete data[valute]
              }
            });
            setRates(data)
          })
          .catch(() => {
            alert(`Ошибка! Данные с сервера не получены.`)
          })
    }
    getData()
  }, [])

  useEffect(() => {
    onChangeBasePrice(basePrice);
  }, [baseCurrency]);

  useEffect(() => {
    onChangeBasePrice(basePrice);
  }, [targetCurrency]);


  const onChangeBasePrice = (value: number) => {
    const result = (value / rates[baseCurrency as string]) * rates[targetCurrency as string];
    setBasePrice(value);
    setTargetPrice(+result.toFixed(2));
  };

  const onChangeTargetPrice = (value: number) => {
    const result = (value / rates[targetCurrency as string]) * rates[baseCurrency as string];
    setTargetPrice(value);
    setBasePrice(+result.toFixed(2));
  };

  return (
      <Layout>
        <div className={styles.main}>
          <div className={styles.header}>
            <h1>Конвертер валют</h1>
          </div>
          <div className={styles.content}>
            <MySelect
                placeholder='Базовая валюта'
                value={basePrice}
                currency={baseCurrency}
                onChangeCurrency={setBaseCurrency}
                onHandleChange={onChangeBasePrice}
                options={Object.keys(rates)}
                rucurrency={rucurrency}
            />
            <MySelect
                placeholder='Целевая валюта'
                value={targetPrice}
                currency={targetCurrency}
                onChangeCurrency={setTargetCurrency}
                onHandleChange={onChangeTargetPrice}
                options={Object.keys(rates)}
                rucurrency={rucurrency}
            />
          </div>
        </div>
      </Layout>
  );
}

export default App;
