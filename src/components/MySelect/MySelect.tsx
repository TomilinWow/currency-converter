import React, {FC} from "react";
import {InputNumber, Select} from "antd";
import styles from "./MySelect.module.scss";
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

    return (

        <>
            <div className={styles.select}>
                <InputNumber
                    style={{width: 200}}
                    size='large'

                    value={value}
                    placeholder="Введите значение..."
                    formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    onChange={(value: number) => onHandleChange(value)}
                />
                    <Select
                        size='large'
                        defaultValue={currency}
                        style={{width: 200}}
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
