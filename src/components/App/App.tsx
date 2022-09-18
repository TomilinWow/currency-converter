import React, {FC} from 'react';
import styles from './App.module.scss'
import {Layout} from "antd";
import {Converter} from "../Converter/Converter";


const App: FC = () => {
    return (
        <Layout className={styles.main}>
            <div className={styles.header}>
                <h1>Конвертер валют</h1>
            </div>
            <Converter/>
        </Layout>
    );
}

export default App;
