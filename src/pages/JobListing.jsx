import { getJobs } from '@/api/apiJobs'
import useFetch from '@/hooks/useFetch';
import { useSession, useUser } from '@clerk/clerk-react'
import React, { useEffect, useState } from 'react'
import { BarLoader } from 'react-spinners';
import JobCard from '@/components/JobCard';
import { getCompanies } from '@/api/apiCompanies';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel,SelectItem,  } from '@radix-ui/react-select';
import { State } from 'country-state-city';

function JobListing() {
    const [searchQuery, setSearchQuery] = useState("");
    const [location, setLocation] = useState("");
    const [company_id, setCompany_id] = useState("");
    const {isLoaded}  = useUser();
    const {fn: fnJobs, data: jobs, loading: loadingJobs} = useFetch(getJobs,{location,  company_id, searchQuery} )
    // console.log(jobs);
    // console.log(loadingJobs);

    const {fn: fnCompanies, data:companies}  = useFetch(getCompanies)

    useEffect(() => {
        if (isLoaded) {
            fnCompanies();
        }
    }, [isLoaded])

    useEffect(()=> {
        if(isLoaded) {
            fnJobs();
        }
    }, [isLoaded, location, searchQuery, company_id]);

    if (!isLoaded) {
        return <BarLoader className='mb-4' width={"100%"} color='#36d7b7'   />;
    }

    function handleSearch(e) {
        e.preventDefault();
        let formData = new FormData(e.target)
        const query = formData.get('search-query');
        if(query) setSearchQuery(query  )
    }

    function clearFilters() {
        setSearchQuery("");
        setCompany_id("");
        setLocation("");
    }

  return (
    <div className="">
      <h1 className="gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8">
        Latest Jobs
      </h1>
      <form
        onSubmit={handleSearch}
        className="h-14 flex flex-row w-full gap-2 items-center mb-3"
      >
        <Input
          type="text"
          placeholder="Search Jobs by Title.."
          name="search-query"
          className="h-full flex-1  px-4 text-md"
        />
        <Button type="submit" className="h-full sm:w-28" variant="blue">
          Search
        </Button>
      </form>

        <div className="flex flex-col sm:flex-row gap-4 p-4 w-full">
  {/* Location Filter */}
  <div className="flex-grow">
    <Select value={location} onValueChange={(value) => setLocation(value)}>
      <SelectTrigger className="w-full border border-gray-600 bg-gray-800 text-white p-2 rounded-md shadow-md">
        <SelectValue placeholder="Filter by Location" />
      </SelectTrigger>
      <SelectContent className="bg-gray-900 text-white">
        <SelectGroup>
          {State.getStatesOfCountry("IN").map(({ name }) => (
            <SelectItem
              key={name}
              value={name}
              className="hover:bg-gray-700 p-2 rounded-md"
            >
              {name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  </div>

  {/* Company Filter */}
  <div className="flex-grow">
    <Select
      value={company_id}
      onValueChange={(value) => setCompany_id(value)}
    >
      <SelectTrigger className="w-full border border-gray-600 bg-gray-800 text-white p-2 rounded-md shadow-md">
        <SelectValue placeholder="Filter by Company" />
      </SelectTrigger>
      <SelectContent className="bg-gray-900 text-white">
        <SelectGroup>
          {companies?.map(({ name, id }) => (
            <SelectItem
              key={id}
              value={id}
              className="hover:bg-gray-700 p-2 rounded-md"
            >
              {name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  </div>

  {/* Clear Filters Button */}
  <div className="flex-none w-32">
    <Button
      className="w-full border border-red-600 bg-red-800 text-white p-2 rounded-md shadow-md hover:bg-red-700"
      variant="destructive"
      onClick={clearFilters}
    >
      Clear Filters
    </Button>
  </div>
</div>


      {loadingJobs && (
        <BarLoader className="mt-4" width={"100%"} color="#36d7b7" />
      )}

      {loadingJobs === false && (
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobs?.length ? (
            jobs.map((job) => {
              return (
                <JobCard
                  key={job.id}
                  job={job}
                  savedInit={job?.saved?.length > 0}
                />
              );
            })
          ) : (
            <div>No Jobs Found 😢</div>
          )}
        </div>
      )}
    </div>
  );
};

export default JobListing;
