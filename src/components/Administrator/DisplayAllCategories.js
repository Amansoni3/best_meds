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
        width: 800
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

export default function DisplayAllCategory(props) {

    const classes = useStyles()

    const [listCategory, setListCategory] = useState([])
    const [open, setOpen] = useState(false)

    const [categoryIcon, setCategoryIcon] = useState({ byte: '', file: '/uploadicon.png' })
    const [tempCategoryIcon, setTempCategoryIcon] = useState({ byte: '', file: '' })
    const [categoryName, setCategoryName] = useState('')
    const [categoryId, setCategoryId] = useState('')

    const [buttonstate, setbuttonstate] = useState(false)



    const handleIconChange = (event) => {
        if (event.target.value.length) {
            setCategoryIcon({ byte: event.target.files[0], file: URL.createObjectURL(event.target.files[0]) })
            setbuttonstate(true)
        }
    }


    const handleCancel = () => {
        setCategoryIcon({ byte: '', file: `${tempCategoryIcon.file}` })
        setbuttonstate(false)
    }



    const fetchAllCategories = async () => {

        var result = await getData('category/displayallcategories')
        setListCategory(result.result)
    }

    const handleEdit = (rowData) => {
        setCategoryId(rowData.categoryid)
        setCategoryName(rowData.categoryname)
        setCategoryIcon({ byte: '', file: `${ServerURL}/images/${rowData.icon}` })
        setTempCategoryIcon({ byte: '', file: `${ServerURL}/images/${rowData.icon}` })

        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleEditIcon = async () => {

        var formData = new FormData()

        formData.append('categoryid', categoryId)
        formData.append('icon', categoryIcon.byte)

        setOpen(false)

        var result = await postDataAndImage("category/editcategoryicon", formData)

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
        fetchAllCategories()
    }

    const handleEditData = async() =>{
      
        setOpen(false)

        var body = {categoryname:categoryName,categoryid:categoryId}
        
        var result = await postData("category/editcategory",body)

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
        
        fetchAllCategories()
      }

      const handleDeleteData = async(categoryid) =>{

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
  
            var body = {categoryid:categoryid}
        
            var result = await postData("category/deletecategory",body)
            
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
          fetchAllCategories()
        })
        
      }
  
  

    useEffect(function () {

        fetchAllCategories()
    }, [])

    function showDialog() {
        return (
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >

                <DialogContent sx={{ backgroundColor: '#55efc4' }}>
                    <Grid container spacing={1}>

                        <Grid item xs={12}>
                            <div style={{ padding: 5, fontSize: 20, fontWeight: 'bold', letterSpacing: 1, display: "flex", alignItems: "center", justifyContent: 'center' }}>
                                <img src="categories.png" height={40} width={40} style={{ padding: 5 }} />
                                Category Interface
                            </div>
                        </Grid>

                        <Grid item xs={6}>
                            <CssTextField variant='outlined' value={categoryName} onChange={(event) => setCategoryName(event.target.value)} label='Category Name' sx={{ input: { color: '#fff' } }} fullWidth />
                        </Grid>

                        <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                            <label htmlFor="contained-button-file" fullWidth>

                                <input accept="image/*" onChange={(event) => handleIconChange(event)} id="contained-button-file" className={classes.inputClasses} multiple type="file" />

                                <Button variant="contained" component="span" style={{ backgroundColor: '#57606f' }} >
                                    Upload Category Icon
                                </Button>

                            </label>
                        </Grid>

                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Avatar
                                alt="Upload Image"
                                src={categoryIcon.file}
                                sx={{ width: 100, height: 100 }}
                                variant="square"

                            />
                        </Grid>
                        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            {buttonstate ? <><Button onClick={() => handleEditIcon()}>Save</Button><Button onClick={() => handleCancel()}>Cancel</Button></> : <></>}
                        </Grid>


                    </Grid>

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
                title="Display All Categories"

                columns={[

                    { title: 'Category Id', field: 'categoryid' },
                    { title: 'Category Name', field: 'categoryname' },
                    { title: 'Category Icon', render: rowData => <img src={`${ServerURL}/images/${rowData.icon}`} style={{ width: 50, borderRadius: '10%' }} /> },

                ]}

                data={listCategory}

                actions={[
                    {
                        icon: 'edit',
                        tooltip: 'Edit',
                        onClick: (event, rowData) => handleEdit(rowData)
                    },
                    {
                        icon: 'delete',
                        tooltip: 'Delete',
                        onClick: (event, rowData) => handleDeleteData(rowData.categoryid)
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

