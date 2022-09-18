import React, {FC} from "react";
import {InputNumber, Select} from "antd";
import styles from "./MySelect.module.scss";
import {useMediaQuery} from "react-responsive";
const {Option} = Select;



type TypeMySelect = {
    placeholder: string;
    value: number;
    currency: string | null;
    onHandleChange: (value: number) => void;
    onChangeCurrency: (cur: string) => void;
    options: string[];
    rucurrency: {[key: string]: string}
}

export const MySelect: FC<TypeMySelect> = React.memo(({
                                               placeholder,
                                               value,
                                               currency,
                                               onHandleChange,
                                               onChangeCurrency,
                                               options,
                                               rucurrency
                                           }) => {

    const isMobile = useMediaQuery({
        query: "(max-width: 786px)"
    });

    return (

        <>
            <div className={styles.select}>
                <InputNumber
                    style={isMobile ? {width: 140} : {width: 180}}
                    size='large'

                    value={value}
                    placeholder="Введите значение..."
                    formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    onChange={(value: number) => onHandleChange(value)}
                />
                    <Select
                        size='large'
                        defaultValue={currency}
                        style={isMobile ? {width: 140} : {width: 180}}
                        onChange={(valute: string) => {
                            onChangeCurrency(valute)
                        }}
                        placeholder={placeholder}
                    >
                        {options.map(option => {
                            return <Option key={option} value={option} >{rucurrency[option]}</Option>
                        })}

                    </Select>
            </div>
        </>
    )
})
