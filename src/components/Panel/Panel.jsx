import './Panel.css'

export default function Panel({className,style,children}){
    return(
        <section className={`panel ${className}`} style={style}>
            {children}
        </section>
    )
}