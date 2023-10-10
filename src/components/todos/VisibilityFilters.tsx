import { useDispatch, useSelector } from "react-redux";
//
import { VISIBILITY_FILTERS } from "../../redux/visibilityHandler/visibilityFilter.reducer";
import { getVisibilityFilterState } from "../../redux/selector";
import { setFilter } from "../../redux/visibilityHandler/visibilityFilter.actions";
import { memo } from "react";

const VisibilityFilters = () => {
  const dispatch = useDispatch()

  const activeFilter = useSelector(state => {
    return getVisibilityFilterState(state)
  })
  
  const onFilterChanged = (currentFilter: string) => {
    dispatch(setFilter(currentFilter))
  }

  return (
    <div className="visibility-filters">
      {Object.keys(VISIBILITY_FILTERS).map((filterKey: string) => {
        const currentFilter = VISIBILITY_FILTERS[filterKey];
        return (
          <span
            key={`visibility-filter-${currentFilter}`}
            className={ "filter " + currentFilter === activeFilter ? "filter--active" : "" }
            onClick={() => {
              onFilterChanged(currentFilter);
            }}
          >
            {currentFilter}
          </span>
        );
      })}
    </div>
  );
};

export default memo(VisibilityFilters);