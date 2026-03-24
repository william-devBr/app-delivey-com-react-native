
import styles from "./style.module.css";

export default function AvisoPedido(props) {

    return (
        <div className={styles.avisoContainer}>
           você tem um novo pedido
           <button
           className={styles.btnAceitar}
            onClick={props.setNovoPedido}>
              aceitar
            </button>
        </div>
    )
}