const { response } = require('express')
const Employee = require('../models/EmployeeModels')


//voir la liste des employees

const index = (req, res, next) => {
    Employee.find()
        .then(response => {
            res.json({
                response
            })
        })
        .catch(error => {
            res.json({
                message: 'il y a une erreur!'
            })
        })
    }

    //Voire un employé
const show = (req, res, next) => {
    let employeeID = req.body.employeeID
    Employee.findById(employeeID)
        .then(response => {
            res.json({
                response
            })
        })
        .catch(error =>{
            res.json({
                message: 'il y a une erreur!'
            })
        })
}

//ajouter un nouveau employé
const store =(req, res, next) =>{
    let employee = new Employee({
        name: req.body.name,
        designation: req.body.designation,
        email: req.body.email,
        phone: req.body.phone,
        age: req.body.age
    })

    /** Pour une seule image
     if(req.file){
        employee.avatar = req.file.path
    }*/

    //Pour plusieurs images
    if(req.files){
        let path = ''
        req.files.forEach(function(files, index, arr){
            path = path + files.path + ','
        })
        path = path.substring(0, path.lastIndexOf(','))
        employee.avatar = path
    }

    employee.save()
        .then(response =>{
            res.json({
                message: 'Employee ajoute avec succès!'
            })
        })
        .catch(error =>{
            res.json({
                message: 'il y a une erreur!'
            })
        })
}
//Modifier un employé

const update = (req, res, next) =>{
    let employeeID = req.body.employeeID

    let updatedData = {
        name: req.body.name,
        designation: req.body.designation,
        email: req.body.email,
        phone: req.body.phone,
        age: req.body.age
    }

    Employee.findByIdAndUpdate(employeeID, {$set: updatedData})
        .then(() =>{
            res.json({
                message: 'Employe modifié avec succès!'
            })
        })
        .catch(error =>{
            res.json({
                message: 'il y a une erreur!'
            })
        })
}

//Supprimer un employé

const destroy = (req, res, next) =>{
    let employeeID = req.body.employeeID
        Employee.findOneAndDelete(employeeID)
            .then(() =>{
                res.json({
                    message: 'Employe supprimé avec succès!'
                })
            })
            .catch(error => {
                resg.json({
                    message: 'il y a une erreur!'
                })
            })
}

 

module.exports = {
    index, show, store, update, destroy
}

       

