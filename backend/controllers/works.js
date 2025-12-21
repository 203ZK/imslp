// import supabase from "../api/supabase.js";

// function splitTermsByDelimiter(query, delimiter=' ') {
//     return query.split(delimiter);
// }

// function createQueryString(queries) {
//     return queries.map(q => `'${q}'`).join(" & ");
// }

// export async function getWorksByQuery(req, res) {
//     const { query } = req.params;
//     const terms = splitTermsByDelimiter(query);
//     const queryString = createQueryString(terms);

//     const { data } = await supabase
//         .from('works')
//         .select()
//         .textSearch('work_title', `${queryString}`);

//     if (data?.length === 0) {
//         console.log('Could not find work with search keywords:', query);
//     }

//     res.send(data);
// };

