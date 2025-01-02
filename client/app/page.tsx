'use client';

import { useQuery } from "@tanstack/react-query";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import AddTaskForm from '../components/AddTaskForm';
import Loader from "../components/Loader";
import UserTasks from "../components/UserTasks";
import { getTasks } from '../TodoRequest/TodoRequest';

const Home = () => {
  const [showForm, setShowForm] = useState(false);
  const router = useRouter()
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['todo'],
    queryFn: getTasks,
  });

  useEffect(() => {
    if (!localStorage.getItem('userData')) {
      router.push('/login')
    }
  }, []);

  useEffect(() => {
    if (data) {
    }
  }, [data]);

  const onSubmitForm = async () => {
    setShowForm(false);
    refetch()
  };

  const closeForm = () => {
    setShowForm(false);
  };

  return (
    <div>
      <div>
        {
          isLoading ? <Loader /> :
            <div>
              <div className="flex justify-end">
                <button
                  className="bg-blue-700 font-serif p-2 rounded-lg m-2 text-white"
                  onClick={() => setShowForm(true)}
                >
                  Add Task
                </button>
              </div>
              <div>
                {isLoading ? (
                  <div>Loading...</div>
                ) : (
                  <UserTasks user_tasks={data} />
                )}
              </div>
            </div>
        }
      </div>
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg overflow-y-auto">
            <AddTaskForm onFormSubmit={onSubmitForm} onClose={closeForm} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
