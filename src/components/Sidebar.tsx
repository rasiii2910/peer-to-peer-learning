// import React from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { useTheme } from '../theme/ThemeProvider';
// import FloatingSquares from './FloatingSquares';

// const NavItem = ({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) => {
//   const loc = useLocation();
//   const active = loc.pathname === to;
//   return (
//     <Link
//       to={to}
//       className={`flex items-center gap-3 px-3 py-3 rounded-md transition-all text-sm font-medium w-full ${
//         active ? 'bg-white/8 text-white shadow-md' : 'text-neutral-300 hover:text-white hover:bg-white/5'
//       }`}
//     >
//       <div className={`p-2 rounded-md ${active ? 'bg-white/10' : 'bg-transparent'}`}>
//         {icon}
//       </div>
//       <div className="flex-1 text-left font-semibold tracking-tight">{label}</div>
//     </Link>
//   );
// };

// export default function Sidebar() {
//   const { theme, toggle } = useTheme();

//   return (
//     <aside className="md:col-span-1 relative p-6 overflow-hidden rounded-lg">
//       {/* background & floating squares */}
//       <div className="absolute inset-0 -z-10 rounded-lg" style={{ background: 'linear-gradient(180deg, rgba(76,29,149,0.6), rgba(79,70,229,0.35))' }} />
//       <FloatingSquares />
      

//       <div className="relative z-20 flex flex-col h-full pb-28">
//         {/* Top brand block */}
//         <div className="text-center mb-3">
//           <h2 className="brand-title text-3xl font-extrabold text-white">SkillSwap</h2>
//           <p className="brand-tagline mt-2 text-xs text-white/90 max-w-[12rem] mx-auto">Your Skills, Their Growth</p>
//           <p className="mt-1 text-[10px] text-white/60 max-w-[15rem] mx-auto">A Community Of Learners, By Learners</p>
//         </div>

//         <div className="h-px bg-white/10 my-3 rounded" />

//         {/* Navigation */}
//         <nav className="flex flex-col gap-2 mt-2">
//           <NavItem
//             to="/profile"
//             icon={(
//               <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="h-5 w-5 text-purple-100">
//                 <path d="M12 12a5 5 0 100-10 5 5 0 000 10zM2 20a10 10 0 0120 0H2z" />
//               </svg>
//             )}
//             label="My Profile"
//           />

//           <NavItem
//             to="/dashboard"
//             icon={(
//               <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="h-5 w-5 text-purple-100">
//                 <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zM13 21h8V11h-8v10zM13 3v6h8V3h-8z" />
//               </svg>
//             )}
//             label="Dashboard"
//           />

//           <NavItem
//             to="/messages"
//             icon={(
//               <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="h-5 w-5 text-purple-100">
//                 <path d="M20 2H4a2 2 0 00-2 2v14l4-2h14a2 2 0 002-2V4a2 2 0 00-2-2z" />
//               </svg>
//             )}
//             label="Messages"
//           />
//         </nav>

//         {/* bottom section */}
//         <div className="absolute left-0 right-0 bottom-0 z-20">
//           <div className="p-6 border-t border-white/10 bg-transparent w-full">
//             <div className="flex items-center gap-3 mb-4 w-full">
//               <div className="flex items-center gap-3">
//                 <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-indigo-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
//                   R
//                 </div>
//                 <div className="min-w-0">
//                   <div className="text-white text-sm font-medium truncate whitespace-nowrap">Rasika Thakur</div>
//                   <div className="text-white/60 text-xs">Student</div>
//                 </div>
//               </div>
//             </div>

//             <div className="flex items-center gap-2 w-full justify-end">
//               <button
//                 onClick={toggle}
//                 className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/8 text-white/90 hover:bg-white/18 transition-all ring-0 focus:ring-2 focus:ring-white/10"
//                 title="Toggle Theme"
//               >
//                 {theme === 'dark' ? (
//                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-yellow-400">
//                     <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.4" fill="currentColor" />
//                     <g stroke="currentColor" strokeWidth="1.2">
//                       <path d="M12 1v2" />
//                       <path d="M12 21v2" />
//                       <path d="M4.22 4.22l1.42 1.42" />
//                       <path d="M18.36 18.36l1.42 1.42" />
//                       <path d="M1 12h2" />
//                       <path d="M21 12h2" />
//                       <path d="M4.22 19.78l1.42-1.42" />
//                       <path d="M18.36 5.64l1.42-1.42" />
//                     </g>
//                   </svg>
//                 ) : (
//                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-white">
//                     <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" stroke="currentColor" strokeWidth="1.2" />
//                   </svg>
//                 )}
//               </button>

//               <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-500/20 text-red-300 hover:bg-red-500/30 transition-all text-xs font-medium flex-shrink-0">
//                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3">
//                   <path d="M16 13v-2H7V8l-5 4 5 4v-3zM20 3h-8v2h8v14h-8v2h8a2 2 0 002-2V5a2 2 0 00-2-2z" />
//                 </svg>
//                 Logout
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </aside>
//   );
// }
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../theme/ThemeProvider';
import FloatingSquares from './FloatingSquares';

const NavItem = ({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) => {
  const loc = useLocation();
  const active = loc.pathname === to;
  return (
    <Link
      to={to}
      className={`flex items-center gap-3 px-3 py-3 rounded-md transition-all text-sm font-medium w-full ${active
          ? 'bg-white/8 text-white shadow-md'
          : 'text-neutral-300 hover:text-white hover:bg-white/5'
        }`}
    >
      <div className={`p-2 rounded-md ${active ? 'bg-white/10' : 'bg-transparent'}`}>
        {icon}
      </div>
      <div className="flex-1 text-left font-semibold tracking-tight">{label}</div>
    </Link>
  );
};

export default function Sidebar() {
  const { theme, toggle } = useTheme();

  return (
    // <aside className="md:col-span-1 relative p-0 overflow-hidden rounded-lg flex flex-col h-screen">
    //   {/* background & floating squares */}
    //   <div
    //     className="absolute inset-0 -z-10 rounded-lg"
    //     style={{
    //       background:
    //         'linear-gradient(180deg, rgba(76,29,149,0.6), rgba(79,70,229,0.35))',
    //     }}
    //   />
    //   <FloatingSquares />

    //   {/* Top brand block - fixed */}
    //   <div className="relative z-20 p-6 border-b border-white/10">
    //     <div className="text-center">
    //       <h2 className="brand-title text-3xl font-extrabold text-white">
    //         SkillSwap
    //       </h2>
    //       <p className="brand-tagline mt-2 text-xs text-white/90 max-w-[12rem] mx-auto">
    //         Your Skills, Their Growth
    //       </p>
    //       <p className="mt-1 text-[10px] text-white/60 max-w-[15rem] mx-auto">
    //         A Community Of Learners, By Learners
    //       </p>
    //     </div>
    //   </div>

    //   {/* Middle scrollable nav */}
    //   <nav className="relative z-20 flex-1 flex flex-col gap-2 px-6 py-4 overflow-y-auto">
    //     <NavItem
    //       to="/profile"
    //       icon={
    //         <svg
    //           xmlns="http://www.w3.org/2000/svg"
    //           fill="currentColor"
    //           viewBox="0 0 24 24"
    //           className="h-5 w-5 text-purple-100"
    //         >
    //           <path d="M12 12a5 5 0 100-10 5 5 0 000 10zM2 20a10 10 0 0120 0H2z" />
    //         </svg>
    //       }
    //       label="My Profile"
    //     />
    //     <NavItem
    //       to="/dashboard"
    //       icon={
    //         <svg
    //           xmlns="http://www.w3.org/2000/svg"
    //           fill="currentColor"
    //           viewBox="0 0 24 24"
    //           className="h-5 w-5 text-purple-100"
    //         >
    //           <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zM13 21h8V11h-8v10zM13 3v6h8V3h-8z" />
    //         </svg>
    //       }
    //       label="Dashboard"
    //     />
    //     <NavItem
    //       to="/messages"
    //       icon={
    //         <svg
    //           xmlns="http://www.w3.org/2000/svg"
    //           fill="currentColor"
    //           viewBox="0 0 24 24"
    //           className="h-5 w-5 text-purple-100"
    //         >
    //           <path d="M20 2H4a2 2 0 00-2 2v14l4-2h14a2 2 0 002-2V4a2 2 0 00-2-2z" />
    //         </svg>
    //       }
    //       label="Messages"
    //     />
    //   </nav>

    //   {/* Bottom profile block - fixed */}
    //   <div className="relative z-20 border-t border-white/10 p-6">
    //     <div className="flex items-center gap-3 mb-4 w-full">
    //       <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-indigo-500 flex items-center justify-center text-white font-bold text-sm">
    //         R
    //       </div>
    //       <div className="min-w-0">
    //         <div className="text-white text-sm font-medium truncate whitespace-nowrap">
    //           Rasika Thakur
    //         </div>
    //         <div className="text-white/60 text-xs">Student</div>
    //       </div>
    //     </div>

    //     <div className="flex items-center gap-2 w-full justify-between">
    //       <button
    //         onClick={toggle}
    //         className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/8 text-white/90 hover:bg-white/18 transition-all"
    //         title="Toggle Theme"
    //       >
    //         {theme === 'dark' ? (
    //           <svg
    //             xmlns="http://www.w3.org/2000/svg"
    //             viewBox="0 0 24 24"
    //             fill="none"
    //             className="h-5 w-5 text-yellow-400"
    //           >
    //             <circle
    //               cx="12"
    //               cy="12"
    //               r="4"
    //               stroke="currentColor"
    //               strokeWidth="1.4"
    //               fill="currentColor"
    //             />
    //             <g stroke="currentColor" strokeWidth="1.2">
    //               <path d="M12 1v2" />
    //               <path d="M12 21v2" />
    //               <path d="M4.22 4.22l1.42 1.42" />
    //               <path d="M18.36 18.36l1.42 1.42" />
    //               <path d="M1 12h2" />
    //               <path d="M21 12h2" />
    //               <path d="M4.22 19.78l1.42-1.42" />
    //               <path d="M18.36 5.64l1.42-1.42" />
    //             </g>
    //           </svg>
    //         ) : (
    //           <svg
    //             xmlns="http://www.w3.org/2000/svg"
    //             viewBox="0 0 24 24"
    //             fill="none"
    //             className="h-5 w-5 text-white"
    //           >
    //             <path
    //               d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
    //               stroke="currentColor"
    //               strokeWidth="1.2"
    //             />
    //           </svg>
    //         )}
    //       </button>

    //       <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-500/20 text-red-300 hover:bg-red-500/30 transition-all text-xs font-medium">
    //         <svg
    //           xmlns="http://www.w3.org/2000/svg"
    //           viewBox="0 0 24 24"
    //           fill="currentColor"
    //           className="h-3 w-3"
    //         >
    //           <path d="M16 13v-2H7V8l-5 4 5 4v-3zM20 3h-8v2h8v14h-8v2h8a2 2 0 002-2V5a2 2 0 00-2-2z" />
    //         </svg>
    //         Logout
    //       </button>
    //     </div>
    //   </div>
    // </aside>
    <aside className="md:col-span-1 relative p-6 overflow-hidden rounded-lg flex flex-col">
  {/* background & floating squares */}
  <div
    className="absolute inset-0 -z-10 rounded-lg"
    style={{
      background:
        'linear-gradient(180deg, rgba(76,29,149,0.6), rgba(79,70,229,0.35))',
    }}
  />
  <FloatingSquares />

  {/* Top brand block - fixed */}
  <div className="absolute top-0 left-0 right-0 p-6 border-b border-white/10 bg-transparent z-20">
    <div className="text-center">
      <h2 className="brand-title text-3xl font-extrabold text-white">
        SkillSwap
      </h2>
      <p className="brand-tagline mt-2 text-xs text-white/90 max-w-[12rem] mx-auto">
        Your Skills, Their Growth
      </p>
      <p className="mt-1 text-[10px] text-white/60 max-w-[15rem] mx-auto">
        A Community Of Learners, By Learners
      </p>
    </div>
  </div>

  {/* Middle nav (scrollable space between top & bottom) */}
  <nav className="flex-1 mt-32 mb-28 flex flex-col gap-2 overflow-y-auto">
    {/* NavItem components go here */}
  </nav>

  {/* Bottom profile block - fixed */}
  <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 p-6 bg-transparent z-20">
    <div className="flex items-center gap-3 mb-4 w-full">
      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-indigo-500 flex items-center justify-center text-white font-bold text-sm">
        R
      </div>
      <div className="min-w-0">
        <div className="text-white text-sm font-medium truncate whitespace-nowrap">
          Rasika Thakur
        </div>
        <div className="text-white/60 text-xs">Student</div>
      </div>
    </div>

    <div className="flex items-center gap-2 w-full justify-between">
      {/* theme toggle + logout */}
    </div>
  </div>
</aside>

  );
}
