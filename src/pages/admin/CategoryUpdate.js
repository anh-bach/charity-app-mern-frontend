import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import { useHistory } from 'react-router';
import CategoryUpdateForm from '../../component/form/CategoryUpdateForm';
import DashboardHorizontalNav from '../../component/nav/DashboardNav';
import CategoryList from '../../component/category/CategoryList';
import { getCategories, deleteCategory } from '../../actions/category';
import { toast } from 'react-toastify';

const CategoryUpdate = () => {
  const [loading, setLoading] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const history = useHistory();

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const res = await getCategories();
      setCategoryList(res.data.data.categories);
      setLoading(false);
    } catch (error) {
      console.log('From loadCategories--->', error);
      setLoading(false);
    }
  };

  const handleRemove = async (slug) => {
    try {
      setLoading(true);
      await deleteCategory(slug);
      toast.success('One category removed!');
      setLoading(false);
      await loadCategories();
      history.push('/admin/dashboard/category');
    } catch (error) {
      console.log('From delete category update page--->', error);
      setLoading(false);
    }
  };

  return (
    <div className='container'>
      <DashboardHorizontalNav />
      <Row gutter={16}>
        <Col span='10'>
          <CategoryUpdateForm
            title='Update Category'
            buttonText='Update'
            loading={loading}
            setLoading={setLoading}
            loadCategories={loadCategories}
          />
        </Col>
        <Col span='14'>
          <CategoryList
            loading={loading}
            categoryList={categoryList}
            handleRemove={handleRemove}
          />
        </Col>
      </Row>
    </div>
  );
};

export default CategoryUpdate;
