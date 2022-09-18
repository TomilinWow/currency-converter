import React, {FC, useEffect, useState} from "react";
import styles from "./Converter.module.scss";
import {MySelect} from "../MySelect/MySelect";
import ruCurrency from "../../json/currency.json";
import locale from "../../json/valute-locale.json";
import {TRates} from "../../types/valute";
import axios from "axios";
import {BASE_URL} from "../../api/api";


const objCurrency: { [key: string]: string } = ruCurrency

let userLang = navigator.language || 'en';

export const Converter: FC = () => {
    const [baseCurrency, setBaseCurrency] = useState<string | null>(userLang in locale
        ? locale[userLang as keyof typeof locale]
        : "USD");
    const [targetCurrency, setTargetCurrency] = useState<string | null>(null);
    const [basePrice, setBasePrice] = useState<number>(0);
    const [targetPrice, setTargetPrice] = useState<number>(0);
    const [rates, setRates] = useState<TRates>({})
    const [options, setOptions] = useState<string[]>([])


    useEffect(() => {
        const getData = async () => {
            await axios.get(BASE_URL)
                .then((res) => {
                    let valutes = Object.keys(ruCurrency)
                    let data = res.data.rates
                    Object.keys(data).forEach(valute => {
                        if (!valutes.includes(valute)) {
                            delete data[valute]
                        }
                    });
                    setRates(data)
                    setOptions(Object.keys(data).sort((a: string, b: string) => {
                        if (objCurrency[a][0] < objCurrency[b][0]) { return -1 }
                        if (objCurrency[a][0] > objCurrency[b][0]) { return 1 }
                        return 0;
                    }))
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
        setTargetPrice(+result.toFixed(3));
    };

    const onChangeTargetPrice = (value: number) => {
        const result = (value / rates[targetCurrency as string]) * rates[baseCurrency as string];
        setTargetPrice(value);
        setBasePrice(+result.toFixed(3));
    };
    return (
        <div className={styles.content}>
            <MySelect
                placeholder='Базовая валюта'
                value={basePrice}
                currency={baseCurrency}
                onChangeCurrency={setBaseCurrency}
                onHandleChange={onChangeBasePrice}
                options={options}
            />
            <MySelect
                placeholder='Целевая валюта'
                value={targetPrice}
                currency={targetCurrency}
                onChangeCurrency={setTargetCurrency}
                onHandleChange={onChangeTargetPrice}
                options={options}
            />
        </div>
    )
}
