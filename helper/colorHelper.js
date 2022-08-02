const pallete = [
    {
        name:'red',
        hex:'#C04C4B'
    },
    {
        name:'yellow',
        hex:'#F0DBA5'
    },
    {
        name:'green',
        hex:'#75C69B'
    },
    {
        name:'brown',
        hex:'#A39473'
    },
    {
        name:'purple',
        hex:'#86649f'
    },
    {
        name:'pink',
        hex:'#f3a9b4'
    }
]

const getColor = (colorName) => {
    const color = pallete.find(color => color.name === colorName)
    if(color){
        return color.hex 
    }else{
        return '#6EA4BB'
    }
}

export default getColor