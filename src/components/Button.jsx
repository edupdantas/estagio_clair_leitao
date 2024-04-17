import styled from 'styled-components'

export default function Button({bgColor, destaque, ...rest}){
    const Button = styled.button`
        margin-right: 12px;
        margin-top: 14px;
        margin-left: 0;
        font-size: 20px;
        border: 0;
        outline: none;
        padding: 12px;
        border-radius: 4px;
        cursor: pointer;
        transition: all 0.5s;
    `

    return (
        <Button style={{margin:0}} {...rest}

        />
    )
}