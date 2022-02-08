import styled from 'styled-components';

export const Container = styled.div`
    width: 100vw;
    height: 100vh;
`

export const CanvasContainer = styled.div`
    width: 100vw;
    height: 50vh;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    .canvas-container {
        position: absolute !important;
    }
`

export const ConfigurationContainer = styled.div`
    width: 100vw;
    height: 50vh;
`

type CanvasProps = {
    selected: boolean
    visibility: 'show' | 'hide'
}

export const Canvas = styled.canvas<CanvasProps>`
    position: absolute;
    width: 480px;
    height: 480px;
    border: solid 1px black;
    pointer-events: ${props => !props.selected && `none`};
    visibility: ${props => props.visibility === 'show' ? `visible` : `hidden`};

`