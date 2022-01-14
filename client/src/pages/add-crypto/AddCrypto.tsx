import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Navigation from "../../components/navigation/Navigation";
import styles from "./addcrypto.module.scss";
import { FormItem } from "../../helpers/interfaces/global.interfaces";
import { addCryptoStore } from "../../stores/addcrypto.store";
import Loading from "../../components/loading/Loading";
import { authStore } from "../../stores/auth.store";
import { observer } from "mobx-react-lite";
import Profit from "../../components/profit/Profit";

interface AddCryptoItem {
  cryptoCurrenceAmount: string;
  fiatAmmount: string;
}

interface AddCryptoFormItem {
  value: string;
  error: string;
}

const AddCrypto = observer(() => {
  const [cryptoCurrencyField, setCryptoCurrency] = useState<AddCryptoFormItem>({
    value: "0",
    error: "",
  });

  const [fiatField, setFiatField] = useState<AddCryptoFormItem>({
    value: "0",
    error: "",
  });

  const [symbol, setSymbol] = useState<AddCryptoFormItem>({
    value: "",
    error: "",
  });

  const changeCryptoCurrency = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value: string = e.target.value;

    let error: string = "";

    if (value === "0") {
      error = "Value cannot be 0";
    } else if (value < "0") {
      error = "Value cannot be negative";
    }

    setCryptoCurrency({
      value: value,
      error: error,
    });
  };

  const changeFiatCurrency = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value: string = e.target.value;

    let error: string = "";

    if (value === "0") {
      error = "Value cannot be 0";
    } else if (value < "0") {
      error = "Value cannot be negative";
    }

    setFiatField({
      value: value,
      error: error,
    });
  };

  const changeSymbol = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value: string = e.target.value;

    const error = "";

    setSymbol({
      value: value,
      error: error,
    });
  };

  const emptyForm = () => {
    setCryptoCurrency({ value: "0", error: "" });
    setFiatField({ value: "0", error: "" });
    setSymbol({ value: "", error: "" });
  };

  const handleSubmit = async () => {
    console.log({ crypto: cryptoCurrencyField.value, fiat: fiatField.value });
    const res = await addCryptoStore.addAsset(
      symbol.value.toUpperCase(),
      parseFloat(cryptoCurrencyField.value),
      parseFloat(fiatField.value)
    );

    if (res) {
      emptyForm();
    }
  };

  const onCryptoFocus = (e: any) => {
    if (e.target.value === "0") {
      setCryptoCurrency({
        value: "",
        error: "",
      });
    }
  };

  const onFiatFocus = (e: any) => {
    if (e.target.value === "0") {
      setFiatField({
        value: "",
        error: "",
      });
    }
  };

  const checkIfFormValid = (): boolean => {
    return (
      cryptoCurrencyField.error === "" &&
      cryptoCurrencyField.value.length > 0 &&
      fiatField.error === "" &&
      fiatField.value.length > 0 &&
      symbol.error === "" &&
      symbol.value.length > 0 &&
      !addCryptoStore.isLoading
    );
  };

  return (
    <Container fluid className={styles.content}>
      {addCryptoStore.isLoading ? <Loading></Loading> : null}
      <Profit></Profit>
      <div className={styles.formWrapper}>
        <div className={styles.form}>
          <p className="fs-1 text-center heading-label mb-5">Form</p>
          <div className={styles.mobileCurrencyIcon}>
            <img
              src={`https://cryptoicon-api.vercel.app/api/icon/${
                symbol.value?.toLowerCase() === ""
                  ? "s"
                  : symbol.value?.toLowerCase()
              }`}
              width={128}
              height={128}
            ></img>
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">
              <i className="fas fa-search"></i>
            </span>
            <input
              value={symbol.value?.toUpperCase()}
              onChange={changeSymbol}
              type="text"
              className="form-control"
              placeholder="Symbol"
              onFocus={onCryptoFocus}
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">
              <i className="fas fa-coins"></i>
            </span>
            <input
              value={cryptoCurrencyField.value}
              onChange={changeCryptoCurrency}
              type="number"
              className="form-control"
              placeholder="Cryptocurrency amount"
              onFocus={onCryptoFocus}
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">
              <i className="fas fa-euro-sign"></i>
            </span>
            <input
              value={fiatField.value}
              type="number"
              className="form-control"
              placeholder="Fiat amount"
              onChange={changeFiatCurrency}
              onFocus={onFiatFocus}
            />
          </div>
          <button
            type="button"
            className="btn bg-btn btn-md btn-block"
            onClick={handleSubmit}
            disabled={!checkIfFormValid()}
          >
            Add Crypto Asset
          </button>
        </div>
        <div className={styles.currencyIcon}>
          <img
            src={`https://cryptoicon-api.vercel.app/api/icon/${
              symbol.value?.toLowerCase() === ""
                ? "s"
                : symbol.value?.toLowerCase()
            }`}
            width={256}
            height={256}
          ></img>
        </div>
      </div>
      <Navigation></Navigation>
    </Container>
  );
});
export default AddCrypto;
