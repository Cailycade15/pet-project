import cl from "./Items_per_row_UI.module.css"

type Props = {
    value: number;
    setValue: (newValue: number) => void;
}

const Items_per_row_UI = ({value, setValue}: Props) => {

    const handleCLick = (newValue: number) => {
        setValue(Number(newValue));
    }
    
    // Ограничение для значений 
    const Value_Items = [2, 3, 4];

    return(
        <div className={cl["icon-container"]}>
            <img className={cl.grid_img} onClick={() => handleCLick(2)} src={value == 2 ? "https://img.icons8.com/?size=100&id=115265&format=png&color=000000" : "https://img.icons8.com/?size=100&id=115221&format=png&color=000000"} alt="" />
            <img className={cl.grid_img} onClick={() => handleCLick(3)} src={value == 3 ? "https://img.icons8.com/?size=100&id=s5aj8IKkzmO5&format=png&color=000000" : "https://img.icons8.com/?size=100&id=jLGlCGQS1SFr&format=png&color=000000"} alt="" />
            <img className={cl.grid_img} onClick={() => handleCLick(4)} src={value == 4 ? "https://img.icons8.com/?size=100&id=11393&format=png&color=000000" : "https://img.icons8.com/?size=100&id=11355&format=png&color=000000"} alt="" />
            
        </div>
    )
}

export default Items_per_row_UI;