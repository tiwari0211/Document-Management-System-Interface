import { Card, CardProps } from '@mui/material'
interface CustomCardProps extends CardProps {
    content:any
   }
function CustomCard(props:CustomCardProps) {
  return (
    <Card {...props}>{props.content}</Card>
  )
}

export default CustomCard