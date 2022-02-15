import React, { useEffect, useState } from "react"
import { styled, makeStyles } from "@mui/styles"
import { ServerURL, postData, postDataAndImage, getData } from "./FetchNodeServices";
import Swal from "sweetalert2";
import { Grid, TextField, Button } from "@mui/material"
import Component from 'react'
import ReactDOM from 'react-dom'
import MaterialTable from 'material-table'
import Avatar from "@mui/material/Avatar"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


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
        width: 1000
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

export default function DisplayAllSubCategory(props) {

    const classes = useStyles()

    const [listSubCategories, setListSubCategories] = useState([])

    const [subCategoryIcon, setSubCategoryIcon] = useState({ byte: '', file: '/uploadicon.png' })
    const [tempSubCategoryIcon, setTempSubCategoryIcon] = useState({ byte: '', file: '' })

    const [subCategoryName, setSubCategoryName] = useState('')

    const [subCategoryId, setSubCategoryId] = useState('')

    const [description, setDescription] = useState('')
    const [categories, setCategories] = useState('')
    const [listCategories, setListCategories] = useState([])

    const [open, setOpen] = useState(false)

    const [buttonstate, setbuttonstate] = useState(false)


    const fetchAllSubCategories = async () => {

        var result = await getData('subcategory/displayallsubcategories')
        setListSubCategories(result.result)
    }

    useEffect(function () {

        fetchAllSubCategories()
        fetchAllCategories()

    }, [])

    const handleEdit = (rowData) => {
        
        setSubCategoryId(rowData.subcategoryid)

        setSubCategoryName(rowData.subcategoryname)
        setDescription(rowData.description)
        setSubCategoryIcon({ byte: '', file: `${ServerURL}/images/${rowData.icon}` })
        setTempSubCategoryIcon({ byte: '', file: `${ServerURL}/images/${rowData.icon}` })

        setCategories(rowData.categoryid)

        setOpen(true);
    };

    const handleCancel = () => {

        setSubCategoryIcon({ byte: '', file: `${tempSubCategoryIcon.file}` })
        setbuttonstate(false)
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleCategoriesChange = (event) => {
        setCategories(event.target.value);
    };



    const handleIconChange = (event) => {
        if (event.target.value.length) {
            setSubCategoryIcon({ byte: event.target.files[0], file: URL.createObjectURL(event.target.files[0]) })
            setbuttonstate(true)
        }
    }

    const fetchAllCategories = async () => {

        var result = await getData('subcategory/fetchallcategories')
        setListCategories(result.result)
    }

    const fillCategories = () => {

        return (listCategories.map((item) => {
            return (<MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>)
        }))
    }


    const handleEditIcon = async () => {

        var formData = new FormData()

        formData.append('subcategoryid', subCategoryId)
        formData.append('icon', subCategoryIcon.byte)

        setOpen(false)

        var result = await postDataAndImage("subcategory/editsubcategoryicon", formData)

        if (result.result) {
            Swal.fire({
                icon: 'success',
                title: 'Best Meds',
                text: 'Icon Edited Succesfully',
                imageUrl: 'pharmacy.jpg',
                imageHeight: 150,
                imageWidth:150,
                imageAlt: 'Custom image'
            })

        }
        else {
            Swal.fire({
                icon: 'error',
                title: 'Best Meds',
                text: 'Failed',
                imageUrl: 'pharmacy.jpg',
                imageHeight: 150,
                imageWidth:150,
                imageAlt: 'Custom image'
            })
        }
        setbuttonstate(false)
        fetchAllSubCategories()
    }

    const handleEditData = async() =>{
      
        setOpen(false)

        var body = {categoryid:categories,subcategoryid:subCategoryId,subcategoryname:subCategoryName,description:description,}
        
        var result = await postData("subcategory/editsubcategory",body)

        if(result.result)
        {
            Swal.fire({
                icon: 'success',
                title: 'Best Meds',
                text: 'Icon Edited Succesfully',
                imageUrl: 'pharmacy.jpg',
                imageHeight: 150,
                imageWidth:150,
                imageAlt: 'Custom image'
            })
  
        }
        else
        {
            Swal.fire({
                icon: 'error',
                title: 'Best Meds',
                text: 'Failed',
                imageUrl: 'pharmacy.jpg',
                imageHeight: 150,
                imageWidth:150,
                imageAlt: 'Custom image'

            })
        }
        
        fetchAllSubCategories()
      }

      const handleDeleteData = async(subcategoryid) =>{

        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then(async(result) => {
          if (result.isConfirmed) {
  
            var body = {subcategoryid:subcategoryid}
        
            var result = await postData("subcategory/deletesubcategory",body)
            
            if(result.result)
            Swal.fire(
              'Deleted!',
              'Department has been deleted.',
              'success'
            )
          
          else
          Swal.fire(
            'Deleted!',
            'Fail To Delete Department.',
            'error'
          )
          }
          fetchAllSubCategories()
        })
        
      }



    function showDialog() {

        return (

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >

                <DialogContent sx={{ backgroundColor: '#55efc4' }}>
                    <DialogContentText id="alert-dialog-description">
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <div style={{ padding: 5, fontSize: 20, fontWeight: 'bold', letterSpacing: 1, display: "flex", alignItems: "center", justifyContent: 'center' }}>
                                    <img src="categories.png" height={40} width={40} style={{ padding: 5 }} />
                                    Sub Category Interface
                                </div>
                            </Grid>

                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Categories</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={categories}
                                        label="Categories"
                                        onChange={handleCategoriesChange}

                                    >
                                        {fillCategories()}
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={6}>
                                <CssTextField variant='outlined' value={subCategoryName} onChange={(event) => setSubCategoryName(event.target.value)} label='Sub Category Name' sx={{ input: { color: '#fff' } }} fullWidth />
                            </Grid>
                            <Grid item xs={6}>
                                <CssTextField variant='outlined' value={description} onChange={(event) => setDescription(event.target.value)} label='Description' sx={{ input: { color: '#fff' } }} fullWidth />
                            </Grid>


                            <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                                <label htmlFor="contained-button-file" fullWidth>

                                    <input accept="image/*" onChange={(event) => handleIconChange(event)} id="contained-button-file" className={classes.inputClasses} multiple type="file" />

                                    <Button variant="contained" component="span" style={{ backgroundColor: '#57606f' }} >
                                        Upload Sub Category Icon
                                    </Button>

                                </label>
                            </Grid>

                            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Avatar
                                    alt="Upload Image"
                                    src={subCategoryIcon.file}
                                    sx={{ width: 100, height: 100 }}
                                    variant="square"

                                />
                            </Grid>
                            <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                {buttonstate ? <><Button onClick={() => handleEditIcon()}>Save</Button><Button onClick={() => handleCancel()}>Cancel</Button></> : <></>}
                            </Grid>
                        </Grid>



                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ backgroundColor: '#55efc4' }}>
                    <Button onClick={handleEditData}>Edit</Button>
                    <Button onClick={handleClose} autoFocus>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>

        )
    }


    function DisplayAll() {

        return (

            <MaterialTable
                title="Display All Sub Categories"

                columns={[

                    { title: 'Category Name', field: 'categoryname' },
                    { title: 'Sub Category Id', field: 'subcategoryid' },
                    { title: 'Sub Category Name', field: 'subcategoryname' },
                    { title: 'Description', field: 'description' },
                    { title: 'Sub Category Icon', render: rowData => <img src={`${ServerURL}/images/${rowData.icon}`} style={{ width: 50, borderRadius: '10%' }} /> },

                ]}

                data={listSubCategories}

                actions={[
                    {
                        icon: 'edit',
                        tooltip: 'Edit',
                        onClick: (event, rowData) => handleEdit(rowData)
                    },
                    {
                        icon: 'delete',
                        tooltip: 'Delete',
                        onClick: (event, rowData) => handleDeleteData(rowData.subcategoryid)
                    }

                ]}
            />

        )

    }


    return (

        <div className={classes.root}>
            <div className={classes.subdiv}>
                {DisplayAll()}
                {showDialog()}

            </div>
        </div>
    )



}