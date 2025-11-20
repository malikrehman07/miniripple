export default function Container({children}){
    return(
        <div style={{ maxWidth: 'calc(1322px + 2rem)', width: '100%', margin: '0 auto', padding: '0 1rem', boxSizing: 'border-box' }}>
            {children}
        </div>
    )  
}