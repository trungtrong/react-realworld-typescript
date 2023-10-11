import { useDispatch, useSelector } from "react-redux";
//
import { VISIBILITY_FILTERS } from "../../core/store/visibilityHandler/visibilityFilter.reducer";
import { getVisibilityFilterState } from "../../core/store/selector";
import { setFilter } from "../../core/store/visibilityHandler/visibilityFilter.actions";
import { memo } from "react";
import { useAppDispatch, useAppSelector } from "../../core/store/store";

const VisibilityFilters = () => {
  const dispatch = useAppDispatch()

  const activeFilter = useAppSelector(state => {
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