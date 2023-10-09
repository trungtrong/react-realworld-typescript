import { connect } from "react-redux";
//
import { setFilter } from "../../redux/actions/todo.actions";
import { VISIBILITY_FILTERS } from "../../redux/reducers/visibilityFilter.reducer";

const VisibilityFilters = ({ activeFilter, setFilter }: any) => {
  return (
    <div className="visibility-filters">
      {Object.keys(VISIBILITY_FILTERS).map((filterKey: string) => {
        const currentFilter = VISIBILITY_FILTERS[filterKey];
        return (
          <span
            key={`visibility-filter-${currentFilter}`}
            className={ "filter " + currentFilter === activeFilter ? "filter--active" : "" }
            onClick={() => {
              setFilter(currentFilter);
            }}
          >
            {currentFilter}
          </span>
        );
      })}
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return { activeFilter: state.visibilityFilter };
};
export default connect(
  mapStateToProps,
  { setFilter }
)(VisibilityFilters);
