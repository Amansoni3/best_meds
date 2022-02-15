import React, { useState, useEffect } from "react";
import MaterialTable from "material-table"
import { getData, ServerURL, postDataAndImage, postData } from "./FetchNodeServices";
import { Grid, TextField, Button } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import Swal from "sweetalert2";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { makeStyles, styled } from '@mui/styles';


const useStyles = makeStyles((theme) => ({

    root: {
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        marginTop: 40,

    },
    subdiv: {

        background: '#55efc4',
        padding: 20,
        width: 1400
    },
    inputClasses: {
        display: 'none'
    },
}))


const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
        color: '#ffffff',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: '#2d3436',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: '#2d3436',
            borderRadius: 0
        },
        '&:hover fieldset': {
            borderColor: '#2d3436',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#fff',
        },
    },
});


export default function DisplayAllProducts(props) {

    const classes = useStyles()

    const [listProducts, setListProducts] = useState([])

    const fetchAllProducts = async () => {
        var result = await getData('products/displayallproducts')
        setListProducts(result.result)
    }

    useEffect(function () {
        fetchAllProducts()
        // fetchAllCategories()
    }, [])

    function DisplayAll() {
        return (
            <MaterialTable
                title="List Of Products"
                columns={[
                    { title: 'Product Id', field: 'productid' },
                    { title: 'Category', field: 'categoryname' },
                    { title: 'Subcategory', field: 'subcategoryname' },
                    { title: 'Brand', field: 'brandname' },
                    { title: 'Product Name', field: 'productname' },
                    { title: 'Description', field: 'description' },
                    { title: 'Price/Offer Type/Offer Price', field: '',render: (rowData) => (<div>{rowData.price}/-<br/>{rowData.offertype}/{rowData.offerprice}/-</div>) },
                    { title: 'Status/Sale Status', field: '',render: (rowData) => (<div>{rowData.status}/{rowData.salesstatus}</div>)},
                    { title: 'Rating', field: 'rating' },
                    { title: 'Stock', field: 'stock' },
                    {
                        title: 'Product Icon', field: '',
                        render: rowData => <img src={`${ServerURL}/images/${rowData.icon}`} style={{ width: 50, borderRadius: '20' }} />
                    },

                ]}
                data={listProducts}
                actions={[
                    {
                        icon: 'edit',
                        tooltip: 'Edit Product',
                        //  onClick: (event, rowData) => handleEdit(rowData)
                    },
                    {
                        icon: 'delete',
                        tooltip: 'Delete Product',
                        //  onClick: (event, rowData) => handleDelete(rowData.brandid)
                    }
                ]}
            />
        )
    }





    return (
        <div className={classes.root}>
            <div className={classes.subdiv}>
                {DisplayAll()}
                {/* {ShowDailog()} */}
            </div>
        </div>
    )



}