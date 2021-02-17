import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import React from "react";

import "components/Web/ItemCount/ItemCount.scss";

function ItemCount({ count, setCount, max }) {
  function restar() {
    if (count > 0) {
      setCount((count) => count - 0.5);
    } else {
      console.log("No se puede bajar mas");
    }
    return false;
  }

  function sumar() {
    if (count < max) {
      setCount((count) => count + 0.5);
    } else {
      console.log("No hay mas stock");
    }
    return false;
  }

  return (
    <div className="item-count">
      <MinusOutlined
        onClick={restar}
        className={count === 0 ? "item-count__btn-disabled" : "item-count__btn"}
      />
      <p className="item-count__number">{count} kg.</p>
      <PlusOutlined
        onClick={sumar}
        className={
          count === max ? "item-count__btn-disabled" : "item-count__btn"
        }
      />
    </div>
  );
}

export default ItemCount;
