package com.rohim.skillifyapp.ui.home.ui.profile


import android.content.Intent
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import com.rohim.skillifyapp.databinding.FragmentProfileBinding
import com.rohim.skillifyapp.ui.auth.AuthViewModel
import com.rohim.skillifyapp.ui.auth.SignInActivity
import com.rohim.skillifyapp.ui.home.ui.search.SearchViewModel
import com.rohim.skillifyapp.ui.job.PostJobActivity
import com.rohim.skillifyapp.ui.profile.AboutActivity
import com.rohim.skillifyapp.ui.profile.DetailProfileActivity

class ProfileFragment : Fragment() {

    private var _binding: FragmentProfileBinding? = null
    private val binding get() = _binding!!

    private lateinit var authViewModel: AuthViewModel

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?,
                              savedInstanceState: Bundle?): View? {
        val dashboardViewModel =
            ViewModelProvider(this).get(SearchViewModel::class.java)

        _binding = FragmentProfileBinding.inflate(inflater, container, false)
        val root: View = binding.root

        binding.containerProfile.setOnClickListener {
            val move = Intent(requireActivity(), DetailProfileActivity::class.java)
            startActivity(move)
        }
        binding.cardPostJob.setOnClickListener {
            val moveToPost = Intent(requireActivity(), PostJobActivity::class.java)
            startActivity(moveToPost)
        }
        binding.cardAbout.setOnClickListener {
            val moveToAbout = Intent(requireActivity(), AboutActivity::class.java)
            startActivity(moveToAbout)
        }
        binding.cardLogout.setOnClickListener {
//            authViewModel.logout()
            startActivity(Intent(requireActivity(), SignInActivity::class.java))
            requireActivity().finishAffinity()
        }
        return root
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}
