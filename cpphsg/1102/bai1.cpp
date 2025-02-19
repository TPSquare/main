#include <bits/stdc++.h>
using namespace std;

unordered_map<char, short> a;
vector<char> l;
short t, i;
string s;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    freopen("bai1.inp", "r", stdin);
    freopen("bai1.out", "w", stdout);
    cin >> t;
    while (t--) {
        a.clear();
        l.clear();
        cin >> s;
        for (char x : s)
            if (++a[x] == 1) l.push_back(x);
        for (i = 0; i < l.size(); i++)
            if (a[l[i]] == 1) break;
        cout << (i == l.size() ? -1 : i) << "\n";
    }
    return 0;
}
