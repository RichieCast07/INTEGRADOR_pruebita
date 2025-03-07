//Esta es la vista completa de categoria
import React, { useState, useEffect } from 'react';
import Logo from '../atoms/Logo';
import axios from 'axios';
import ModalCategories from '../molecules/ModalCategories';
import ModalEditManageCategories from '../molecules/ModalEditManageCategories';
import Button from '../atoms/Button';
import Input from '../atoms/Input';
import ModalDeleteManageCategories from '../molecules/ModalDeleteManageCategories';
import '../styles/pages/ManageCategories.css'

function ManageCategories({ toggleCategoriesMenu }) {
    const [categories, setCategories] = useState([]);
    const [isModalCategoriesOpen, setIsModalCategoriesOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [newCategory, setNewCategory] = useState({ id_Categorias: '', nombreCategoria: '' });
    const [editCategory, setEditCategory] = useState({ id_Categorias: '', nombreCategoria: '' });

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:3000/categorias', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setCategories(response.data);
        } catch (error) {
            console.error('Error al obtener las categorías:', error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleModalCategoriesToggle = () => {
        setIsModalCategoriesOpen(!isModalCategoriesOpen);
    };

    const handleEditModalToggle = (category) => {
        setEditCategory(category);
        setIsEditModalOpen(!isEditModalOpen);
    };

    const handleDeleteModalToggle = () => {
        setIsDeleteModalOpen(!isDeleteModalOpen);
    };

    const handleAddCategory = async () => {
        try {
            await axios.post('http://localhost:3000/categorias/', newCategory, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            fetchCategories();
            setIsModalCategoriesOpen(false);
        } catch (error) {
            console.error('Error al agregar la categoría:', error);
        }
    };

    const handleEditCategory = async () => {
        try {
            await axios.put(`http://localhost:3000/categorias/${editCategory.id_Categorias}`, editCategory, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            fetchCategories();
            setIsEditModalOpen(false);
        } catch (error) {
            console.error('Error al editar la categoría:', error);
        }
    }; 

    return (
        <div className="category-management">
            <header className="navbar">
                <div className="navbar-left">
                    <button className="menu-btn" onClick={toggleCategoriesMenu}>
                        <i className="fas fa-bars"></i>
                    </button>
                    <div className="header-logo">
                        <Logo className="logo-categories" />
                    </div>
                </div>
                <div className="navbar-right">
                    <div className="profile-circle">
                        <i className="fas fa-user-circle"></i>
                    </div>
                </div>
            </header>
            <div className="content">
                <div className="actions">
                    <div className="left-actions">
                        <h1>Gestionar categorías</h1>
                    </div>
                    <div className="right-actions">
                        <i className="fa-solid fa-plus new-category-btn" onClick={handleModalCategoriesToggle}></i>
                    </div>
                </div>
                <div className="category-list-container">
                    <div className="category-list">
                        {categories.map((category) => (
                            <div key={category.id_Categorias} className="category-item">
                                <button className="edit-btn" onClick={() => handleEditModalToggle(category)}>
                                    <div className="red-square"></div>
                                </button>
                                <div className="category-details-name">
                                    <p>{category.nombreCategoria}</p>
                                </div>
                                <div className="category-details-products">
                                    <p>Ver productos</p>
                                </div>
                                <div className="category-actions">
                                    <button className="add-pencil-btn" onClick={() => handleEditModalToggle(category)}>
                                        <i className="fa-solid fa-pencil"></i>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <ModalCategories
                isOpen={isModalCategoriesOpen}
                onClose={handleModalCategoriesToggle}
                newCategory={newCategory}
                setNewCategory={setNewCategory}
                handleAddCategory={handleAddCategory}
            />
            <ModalEditManageCategories
                isOpen={isEditModalOpen}
                onClose={handleEditModalToggle}
                editCategory={editCategory}
                setEditCategory={setEditCategory}
                handleEditCategory={handleEditCategory}
            />
            {/*<ModalDeleteManageCategories
                isOpen={isDeleteModalOpen}
                onRequestClose={handleDeleteModalToggle}
                onDelete={handleDelete}
            />*/}
        </div>
    );
}

export default ManageCategories;