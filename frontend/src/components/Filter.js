import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { SearchBooks } from "../actions/bookActions";
import { Button } from "react-bootstrap";
export default function Filter() {
  const dispatch = useDispatch();
  const [searchkey, setsearchkey] = useState('');
  const [category, setcategory] = useState('all');

  return (
    <div className="container">
      <div className="row justify-content-center   ">
        <div className="col-md-3">
          <input
            onChange={(e) => {
              setsearchkey(e.target.value);
            }}
            value={searchkey}
            type="text"
            className="form-control w-100"
            placeholder="Find book"
          />
        </div>
        <div className="col-md-3">
          <select
            className="form-select w-100 "
            value={category}
            onChange={(e) => setcategory(e.target.value)}
          >
            <option value="all">All </option>
            <option value="Programming">Programming</option>
            <option value="strategy">Self Improve</option>
            
          </select>
        </div>
        <div className="col-md-3">
          <Button
            className='btn-black'
            variant='secondary'
            onClick={() => {
              dispatch(SearchBooks(searchkey, category));
            }}
          >
            Search
          </Button>
          </div>
      </div>
    </div>
  );
}
