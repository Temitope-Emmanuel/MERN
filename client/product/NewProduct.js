import React, {useState, useEffect} from 'react'
import {Link, Redirect} from 'react-router-dom'
import PropTypes from "prop-types"
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import FileUpload from '@material-ui/icons/AddPhotoAlternate'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'
import { makeStyles } from '@material-ui/core/styles'
import {create} from './api-product.js'
import {read} from '../shop/api-shop'
import {isAuthenticated} from './../auth/auth-helper'
import Chips from "./Chip"


const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2)
  },
  error: {
    verticalAlign: 'middle'
  },
  title: {
    marginTop: theme.spacing(2),
    color: theme.palette.openTitle,
    fontSize: '1.2em'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300
  },
  submit: {
    margin: 'auto',
    marginBottom: theme.spacing(2)
  },
  input: {
    display: 'none'
  },
  filename:{
    marginLeft:'10px'
  }
}))



const NewProduct = ({match}) => {
    const classes = useStyles()
    const [values, setValues] = useState({
        name: '',
        description: '',
        image: null,
        category: '',
        quantity: '',
        price: '',
    })
    
    const[alert,setAlert] = useState({
        redirect: false,
        submit:true,
        shop:{},
        error: ''
    })

    useEffect(() => {
        read({
            shopId: match.params.shopId
        }).then(data => {
            if(data.error){
                console.log(err)
            }else{
                setAlert({...alert,shop:data})
            }
        })
    },[match.params.shopId])

    React.useEffect(() => {
        const isSubmit = isValid()
        setAlert({...alert,submit:!isSubmit})
    },[values])    

    const isValid = () => {
            return ["name","description",
            'category',"price"].every(
                (i) => String(values[i]).length > 0 )
    }

    const jwt = isAuthenticated()
    const handleChange = name => event => {
        const value = name === 'image'
          ? event.target.files[0]
          : event.target.value
        setValues({...values,  [name]: value })
      }
      const setCategory = (value) => {
        setValues({...values,category:value})
      }
      const clickSubmit = () => {
        let productData = new FormData()
        values.name && productData.append('name', values.name)
        values.description && productData.append('description', values.description)
        values.image && productData.append('image', values.image)
        values.category && productData.append('category', values.category)
        values.quantity && productData.append('quantity', values.quantity)
        values.price && productData.append('price', values.price)
    
        create({
          shopId: match.params.shopId,
          token: jwt.token
        }, productData).then((data) => {
          if (data.error) {
            setAlert({...alert, error: data.error})
          } else {
            setAlert({...alert, error: '', redirect: true})
          }
        })
      }
      if (alert.redirect) {
        return (
        <Redirect to={`/shops/${alert.shop?._id}`}/>)
      }
      return (
      <div>
        <Card className={classes.card}>
          <CardContent>
            <Typography type="headline" component="h2"
             className={classes.title}>
              {`Add New Product To ${alert.shop.name} Shop`}
            </Typography><br/>
            <input accept="image/*" onChange={handleChange('image')} className={classes.input} id="icon-button-file" type="file"/>
            <label htmlFor="icon-button-file">
              <Button variant="contained" color="secondary"
               component="span">
                Upload Photo
                <FileUpload/>
              </Button>
            </label>
             <span className={classes.filename}>
                 {values.image ? values.image.name : ''}
             </span>
             <br/>
            <TextField id="name" label="Name"
             className={classes.textField} value={values.name}
              onChange={handleChange('name')} margin="normal"/><br/>
            <TextField
              id="multiline-flexible"
              label="Description" multiline
              rows="2" value={values.description}
              onChange={handleChange('description')}
              className={classes.textField} margin="normal"
            /><br/>
            <TextField id="quantity" label="Quantity"
              className={classes.textField} value={values.quantity}
              onChange={handleChange('quantity')} type="number"
              margin="normal"/>
            <br/>
            <TextField id="price" label="Price"
             className={classes.textField} value={values.price}
             onChange={handleChange('price')} type="number"
             margin="normal"/>
             <br/>
              <Chips onChange={setCategory} />
            <br/>
            {
              alert.error && (<Typography component="p"
               color="error">
                <Icon color="error"
                 className={classes.error}>error</Icon>
                {alert.error}</Typography>)
            }
          </CardContent>
          <CardActions>
            <Button color="primary" variant="contained"
             disabled={alert.submit}
             onClick={clickSubmit} className={classes.submit}
             >Submit</Button>
            <Link to={'/seller/shop/edit/'+match.params.shopId}
             className={classes.submit}>
                 <Button variant="contained">Cancel</Button></Link>
          </CardActions>
        </Card>
      </div>)
  
}


export default NewProduct